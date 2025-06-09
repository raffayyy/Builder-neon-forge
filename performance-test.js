// Performance Test Script
// Add this to your browser console to test the optimizations

(() => {
  console.log('🚀 Starting Portfolio Performance Test...');

  // Test 1: Check if portfolioTracker is available
  console.log('\n📊 Testing Analytics Tracking:');
  if (window.portfolioTracker) {
    console.log('✅ portfolioTracker is available');
    console.log('Available methods:', Object.keys(window.portfolioTracker));
  } else {
    console.log('❌ portfolioTracker not found');
  }

  // Test 2: Monitor FPS
  console.log('\n🎮 Monitoring FPS for 5 seconds...');
  let frameCount = 0;
  let startTime = performance.now();
  
  const countFrames = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - startTime >= 5000) {
      const avgFPS = frameCount / 5;
      console.log(`Average FPS: ${avgFPS.toFixed(2)}`);
      
      if (avgFPS >= 55) {
        console.log('✅ Excellent performance (55+ FPS)');
      } else if (avgFPS >= 30) {
        console.log('⚠️ Good performance (30-55 FPS)');
      } else {
        console.log('❌ Poor performance (<30 FPS)');
      }
      return;
    }
    
    requestAnimationFrame(countFrames);
  };
  
  requestAnimationFrame(countFrames);

  // Test 3: Check reduced motion preference
  console.log('\n♿ Accessibility Check:');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  console.log(`Prefers reduced motion: ${prefersReducedMotion ? 'Yes' : 'No'}`);
  
  // Test 4: Memory usage (if available)
  if (performance.memory) {
    console.log('\n💾 Memory Usage:');
    const memory = performance.memory;
    console.log(`Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
  }

  // Test 5: Canvas optimization check
  console.log('\n🎨 Canvas Optimization Check:');
  const canvas = document.querySelector('canvas');
  if (canvas) {
    console.log('✅ Canvas found for particle system');
    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
    const ctx = canvas.getContext('2d');
    console.log(`Canvas context: ${ctx ? 'Available' : 'Not available'}`);
  } else {
    console.log('❌ No canvas found');
  }

  // Test 6: Check particle count
  console.log('\n✨ Particle System Check:');
  const particles = document.querySelectorAll('.particle');
  console.log(`Traditional particles found: ${particles.length}`);
  if (particles.length > 30) {
    console.log('⚠️ High particle count may impact performance');
  } else {
    console.log('✅ Optimized particle count');
  }

  // Test 7: Performance timing
  console.log('\n⏱️ Performance Timing:');
  const timing = performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  console.log(`Page load time: ${loadTime}ms`);
  
  if (loadTime < 2000) {
    console.log('✅ Fast load time (<2s)');
  } else if (loadTime < 5000) {
    console.log('⚠️ Moderate load time (2-5s)');
  } else {
    console.log('❌ Slow load time (>5s)');
  }

  // Test 8: Test analytics functions
  console.log('\n🔬 Testing Analytics Functions:');
  try {
    if (window.portfolioTracker?.trackProjectView) {
      console.log('✅ trackProjectView function available');
    }
    if (window.portfolioTracker?.trackSocialClick) {
      console.log('✅ trackSocialClick function available');
    }
    if (window.portfolioTracker?.trackDownload) {
      console.log('✅ trackDownload function available');
    }
    if (window.portfolioTracker?.trackContact) {
      console.log('✅ trackContact function available');
    }
  } catch (error) {
    console.log('❌ Error testing analytics:', error);
  }

  console.log('\n🎉 Performance test completed!');
  console.log('Use Ctrl+Shift+P to toggle the performance monitor overlay');
})();
