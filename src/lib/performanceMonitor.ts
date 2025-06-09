import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface PerformanceMetrics {
  id: string;
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  connectionType: string;
}

interface OptimizationSuggestion {
  type: 'critical' | 'warning' | 'suggestion';
  message: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();
  private lastReport: number = 0;
  private reportInterval: number = 30000; // 30 seconds

  constructor() {
    this.initializeVitalsTracking();
    this.initializeCustomMetrics();
    this.startContinuousMonitoring();
  }

  private initializeVitalsTracking() {
    // Core Web Vitals tracking
    getCLS(this.handleMetric.bind(this));
    getFID(this.handleMetric.bind(this));
    getFCP(this.handleMetric.bind(this));
    getLCP(this.handleMetric.bind(this));
    getTTFB(this.handleMetric.bind(this));
  }

  private handleMetric(metric: any) {
    const performanceMetric: PerformanceMetrics = {
      id: this.generateId(),
      metric: metric.name,
      value: metric.value,
      rating: metric.rating || 'good',
      timestamp: Date.now(),
      url: window.location.pathname,
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType()
    };

    this.metrics.push(performanceMetric);
    this.analyzeAndOptimize(performanceMetric);
  }

  private initializeCustomMetrics() {
    // Animation performance tracking
    this.trackAnimationPerformance();
    
    // Memory usage monitoring
    this.trackMemoryUsage();
    
    // Network performance
    this.trackNetworkPerformance();
    
    // User interaction latency
    this.trackInteractionLatency();
  }

  private trackAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        this.handleMetric({
          name: 'FPS',
          value: fps,
          rating: fps >= 55 ? 'good' : fps >= 35 ? 'needs-improvement' : 'poor'
        });
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  private trackMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize;
        
        this.handleMetric({
          name: 'Memory Usage',
          value: memoryUsage * 100,
          rating: memoryUsage < 0.7 ? 'good' : memoryUsage < 0.85 ? 'needs-improvement' : 'poor'
        });
      }, 10000);
    }
  }

  private trackNetworkPerformance() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const trackConnection = () => {
        this.handleMetric({
          name: 'Effective Connection Type',
          value: this.getConnectionScore(connection.effectiveType),
          rating: this.getConnectionRating(connection.effectiveType)
        });
      };
      
      connection.addEventListener('change', trackConnection);
      trackConnection();
    }
  }

  private trackInteractionLatency() {
    const events = ['click', 'touchstart', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, (e) => {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
          const latency = performance.now() - startTime;
          
          this.handleMetric({
            name: 'Interaction Latency',
            value: latency,
            rating: latency < 16 ? 'good' : latency < 50 ? 'needs-improvement' : 'poor'
          });
        });
      });
    });
  }

  private startContinuousMonitoring() {
    setInterval(() => {
      this.generatePerformanceReport();
      this.cleanupOldMetrics();
    }, this.reportInterval);
  }

  private analyzeAndOptimize(metric: PerformanceMetrics) {
    const suggestions = this.generateOptimizationSuggestions(metric);
    
    if (suggestions.length > 0) {
      this.implementAutoOptimizations(suggestions);
      this.notifyPerformanceIssues(suggestions);
    }
  }

  private generateOptimizationSuggestions(metric: PerformanceMetrics): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];

    switch (metric.metric) {
      case 'CLS':
        if (metric.rating === 'poor') {
          suggestions.push({
            type: 'critical',
            message: 'High Cumulative Layout Shift detected',
            action: 'Optimize image dimensions and reserve space for dynamic content',
            impact: 'high'
          });
        }
        break;

      case 'LCP':
        if (metric.rating === 'poor') {
          suggestions.push({
            type: 'critical',
            message: 'Slow Largest Contentful Paint',
            action: 'Optimize largest images and preload critical resources',
            impact: 'high'
          });
        }
        break;

      case 'FID':
        if (metric.rating === 'poor') {
          suggestions.push({
            type: 'warning',
            message: 'High First Input Delay',
            action: 'Reduce JavaScript execution time and use code splitting',
            impact: 'medium'
          });
        }
        break;

      case 'FPS':
        if (metric.value < 30) {
          suggestions.push({
            type: 'warning',
            message: 'Low frame rate detected',
            action: 'Reduce animation complexity or enable GPU acceleration',
            impact: 'medium'
          });
        }
        break;

      case 'Memory Usage':
        if (metric.value > 85) {
          suggestions.push({
            type: 'critical',
            message: 'High memory usage',
            action: 'Clean up unused objects and optimize large data structures',
            impact: 'high'
          });
        }
        break;
    }

    return suggestions;
  }

  private implementAutoOptimizations(suggestions: OptimizationSuggestion[]) {
    suggestions.forEach(suggestion => {
      switch (suggestion.action) {
        case 'Reduce animation complexity or enable GPU acceleration':
          this.enableGPUAcceleration();
          break;
          
        case 'Clean up unused objects and optimize large data structures':
          this.triggerMemoryCleanup();
          break;
          
        case 'Optimize image dimensions and reserve space for dynamic content':
          this.optimizeImages();
          break;
      }
    });
  }

  private enableGPUAcceleration() {
    // Add GPU acceleration hints to animations
    const animatedElements = document.querySelectorAll('[data-animate="true"]');
    animatedElements.forEach(element => {
      (element as HTMLElement).style.transform = 'translateZ(0)';
      (element as HTMLElement).style.willChange = 'transform, opacity';
    });
  }

  private triggerMemoryCleanup() {
    // Trigger garbage collection (if available)
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
    
    // Clean up large cached objects
    if ('portfolioCache' in window) {
      (window as any).portfolioCache.clear();
    }
  }

  private optimizeImages() {
    const images = document.querySelectorAll('img[data-optimize="true"]');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  private notifyPerformanceIssues(suggestions: OptimizationSuggestion[]) {
    const criticalSuggestions = suggestions.filter(s => s.type === 'critical');
    
    if (criticalSuggestions.length > 0) {
      console.warn('Portfolio Performance Issues:', criticalSuggestions);
      
      // Send to analytics if available
      if ('portfolioTracker' in window) {
        (window as any).portfolioTracker.trackPerformanceIssue(criticalSuggestions);
      }
    }
  }

  private generatePerformanceReport() {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < this.reportInterval);
    
    if (recentMetrics.length === 0) return;

    const report = {
      timestamp: now,
      url: window.location.pathname,
      deviceType: this.getDeviceType(),
      metrics: this.aggregateMetrics(recentMetrics),
      suggestions: this.getActiveSuggestions()
    };

    // Store report locally
    const reports = JSON.parse(localStorage.getItem('portfolioPerformanceReports') || '[]');
    reports.push(report);
    
    // Keep only last 10 reports
    if (reports.length > 10) {
      reports.shift();
    }
    
    localStorage.setItem('portfolioPerformanceReports', JSON.stringify(reports));
  }

  private aggregateMetrics(metrics: PerformanceMetrics[]) {
    const grouped = metrics.reduce((acc, metric) => {
      if (!acc[metric.metric]) {
        acc[metric.metric] = [];
      }
      acc[metric.metric].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(grouped).map(([metric, values]) => ({
      metric,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length
    }));
  }

  private getActiveSuggestions(): OptimizationSuggestion[] {
    const recentMetrics = this.metrics.filter(m => 
      Date.now() - m.timestamp < this.reportInterval && 
      m.rating !== 'good'
    );

    return recentMetrics.flatMap(metric => 
      this.generateOptimizationSuggestions(metric)
    );
  }

  private cleanupOldMetrics() {
    const cutoff = Date.now() - (this.reportInterval * 10); // Keep 10 intervals
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
  }

  private getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getConnectionType(): string {
    if ('connection' in navigator) {
      return (navigator as any).connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  private getConnectionScore(type: string): number {
    const scores = { 'slow-2g': 1, '2g': 2, '3g': 3, '4g': 4 };
    return scores[type as keyof typeof scores] || 0;
  }

  private getConnectionRating(type: string): 'good' | 'needs-improvement' | 'poor' {
    const score = this.getConnectionScore(type);
    if (score >= 3) return 'good';
    if (score >= 2) return 'needs-improvement';
    return 'poor';
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Public API
  public getMetrics(): PerformanceMetrics[] {
    return this.metrics;
  }

  public getLatestReport() {
    const reports = JSON.parse(localStorage.getItem('portfolioPerformanceReports') || '[]');
    return reports[reports.length - 1];
  }

  public exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      reports: JSON.parse(localStorage.getItem('portfolioPerformanceReports') || '[]'),
      timestamp: Date.now()
    }, null, 2);
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
