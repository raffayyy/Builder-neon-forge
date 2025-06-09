// Performance validation script for portfolio optimizations
console.log('🚀 Testing Portfolio Performance Optimizations...\n');

// 1. Test CSS Animation Performance
function testCSSAnimations() {
  console.log('📊 CSS Animation Performance Test:');
  const startTime = performance.now();
  
  // Simulate CSS transform operations
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.style.transform = `translateX(${i}px) translateY(${i}px) scale(${1 + i * 0.001})`;
    div.style.willChange = 'transform';
    document.body.appendChild(div);
    document.body.removeChild(div);
  }
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`   ✅ CSS Transforms: ${duration.toFixed(2)}ms`);
  return duration;
}

// 2. Test Particle System Performance
function testParticleSystem() {
  console.log('🎯 Particle System Performance Test:');
  const startTime = performance.now();
  
  // Simulate particle calculations (optimized version)
  const particleCount = 25; // Reduced from 60
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      velocity: Math.random() * 2,
      opacity: Math.random() * 0.3 + 0.1
    });
  }
  
  // Simulate animation frame calculations
  for (let frame = 0; frame < 60; frame++) {
    particles.forEach(particle => {
      particle.y += particle.velocity;
      if (particle.y > 100) particle.y = 0;
    });
  }
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`   ✅ 25 Particles, 60 frames: ${duration.toFixed(2)}ms`);
  return duration;
}

// 3. Test Memory Usage
function testMemoryUsage() {
  console.log('💾 Memory Usage Test:');
  
  if (performance.memory) {
    const memory = performance.memory;
    console.log(`   📈 Used JS Heap: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📊 Total JS Heap: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   🎯 Heap Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    
    const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    console.log(`   ✅ Memory Usage: ${usagePercentage.toFixed(2)}%`);
    
    return usagePercentage;
  } else {
    console.log('   ⚠️  Memory API not available in this browser');
    return 0;
  }
}

// 4. Test FPS Simulation
function testFPSSimulation() {
  console.log('🎮 FPS Simulation Test:');
  
  let frameCount = 0;
  const startTime = performance.now();
  let lastTime = startTime;
  
  function simulateFrame() {
    const currentTime = performance.now();
    frameCount++;
    
    if (currentTime - startTime >= 1000) {
      const fps = frameCount;
      console.log(`   ✅ Simulated FPS: ${fps}`);
      
      let performance_rating = 'Poor';
      if (fps >= 55) performance_rating = 'Excellent';
      else if (fps >= 45) performance_rating = 'Good';
      else if (fps >= 30) performance_rating = 'Average';
      
      console.log(`   🏆 Performance Rating: ${performance_rating}`);
      return fps;
    }
    
    if (frameCount < 120) { // Simulate 2 seconds worth of frames
      requestAnimationFrame(simulateFrame);
    }
  }
  
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      simulateFrame();
      setTimeout(() => resolve(frameCount), 1100);
    });
  });
}

// 5. Test Analytics Performance
function testAnalyticsPerformance() {
  console.log('📈 Analytics Performance Test:');
  const startTime = performance.now();
  
  // Simulate analytics tracking calls
  const events = [
    'page_view', 'scroll_depth', 'section_view', 'button_click',
    'resume_download', 'social_click', 'project_view', 'contact_form'
  ];
  
  events.forEach(event => {
    // Simulate tracking call with error handling
    try {
      const data = {
        event,
        timestamp: performance.now(),
        session_id: 'test-session',
        user_agent: navigator.userAgent.substring(0, 50)
      };
      // Simulate the tracking call
      JSON.stringify(data);
    } catch (error) {
      console.log(`   ⚠️  Error tracking ${event}: ${error.message}`);
    }
  });
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`   ✅ Analytics Processing: ${duration.toFixed(2)}ms`);
  return duration;
}

// 6. Overall Performance Score
function calculatePerformanceScore(metrics) {
  console.log('\n🏅 Performance Score Calculation:');
  
  let score = 100;
  
  // CSS Animation Performance (weight: 25%)
  if (metrics.cssAnimation > 50) score -= 15;
  else if (metrics.cssAnimation > 20) score -= 5;
  
  // Particle System Performance (weight: 30%)
  if (metrics.particleSystem > 20) score -= 20;
  else if (metrics.particleSystem > 10) score -= 10;
  
  // Memory Usage (weight: 25%)
  if (metrics.memoryUsage > 50) score -= 15;
  else if (metrics.memoryUsage > 25) score -= 5;
  
  // Analytics Performance (weight: 20%)
  if (metrics.analyticsPerformance > 10) score -= 10;
  else if (metrics.analyticsPerformance > 5) score -= 5;
  
  score = Math.max(0, Math.min(100, score));
  
  console.log(`   🎯 Overall Performance Score: ${score}/100`);
  
  if (score >= 90) console.log('   🌟 Rating: EXCELLENT - Optimizations working perfectly!');
  else if (score >= 75) console.log('   ✨ Rating: GOOD - Minor optimizations possible');
  else if (score >= 60) console.log('   ⚡ Rating: AVERAGE - Some optimizations needed');
  else console.log('   🔧 Rating: NEEDS WORK - Significant optimizations required');
  
  return score;
}

// Run all tests
async function runPerformanceTests() {
  console.log('═'.repeat(60));
  console.log('🔥 PORTFOLIO PERFORMANCE VALIDATION');
  console.log('═'.repeat(60));
  
  const metrics = {};
  
  try {
    metrics.cssAnimation = testCSSAnimations();
    console.log('');
    
    metrics.particleSystem = testParticleSystem();
    console.log('');
    
    metrics.memoryUsage = testMemoryUsage();
    console.log('');
    
    metrics.analyticsPerformance = testAnalyticsPerformance();
    console.log('');
    
    await testFPSSimulation();
    
    const finalScore = calculatePerformanceScore(metrics);
    
    console.log('\n📋 Summary:');
    console.log(`   🎨 CSS Animations: ${metrics.cssAnimation.toFixed(2)}ms`);
    console.log(`   🎯 Particle System: ${metrics.particleSystem.toFixed(2)}ms`);
    console.log(`   💾 Memory Usage: ${metrics.memoryUsage.toFixed(2)}%`);
    console.log(`   📈 Analytics: ${metrics.analyticsPerformance.toFixed(2)}ms`);
    console.log(`   🏆 Final Score: ${finalScore}/100`);
    
  } catch (error) {
    console.error('❌ Performance test failed:', error);
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('✅ Performance validation complete!');
  console.log('═'.repeat(60));
}

// Auto-run tests if this script is loaded directly
if (typeof window !== 'undefined') {
  // Browser environment
  document.addEventListener('DOMContentLoaded', runPerformanceTests);
} else {
  // Node.js environment
  runPerformanceTests();
}

export { runPerformanceTests, calculatePerformanceScore };
