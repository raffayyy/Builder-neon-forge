interface UserBehavior {
  sectionViews: Record<string, number>;
  timeSpent: Record<string, number>;
  interactions: Array<{
    type: 'click' | 'hover' | 'scroll';
    element: string;
    timestamp: number;
  }>;
  preferences: {
    techStack: string[];
    projectTypes: string[];
    contentTypes: string[];
  };
}

interface PersonalizationProfile {
  userId: string;
  userType: 'developer' | 'recruiter' | 'student' | 'entrepreneur' | 'general';
  interests: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  engagementScore: number;
  lastVisit: Date;
  totalVisits: number;
}

class PersonalizationEngine {
  private profile: PersonalizationProfile | null = null;
  private behavior: UserBehavior;
  private recommendations: string[] = [];

  constructor() {
    this.behavior = this.loadBehaviorData();
    this.profile = this.loadUserProfile();
  }

  private loadBehaviorData(): UserBehavior {
    const stored = localStorage.getItem('userBehavior');
    return stored ? JSON.parse(stored) : {
      sectionViews: {},
      timeSpent: {},
      interactions: [],
      preferences: { techStack: [], projectTypes: [], contentTypes: [] }
    };
  }

  private loadUserProfile(): PersonalizationProfile | null {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : null;
  }

  trackInteraction(type: 'click' | 'hover' | 'scroll', element: string) {
    this.behavior.interactions.push({
      type,
      element,
      timestamp: Date.now()
    });
    
    this.updateEngagementScore();
    this.saveBehaviorData();
  }

  trackSectionView(sectionId: string, timeSpent: number) {
    this.behavior.sectionViews[sectionId] = (this.behavior.sectionViews[sectionId] || 0) + 1;
    this.behavior.timeSpent[sectionId] = (this.behavior.timeSpent[sectionId] || 0) + timeSpent;
    
    this.updateUserType();
    this.generateRecommendations();
    this.saveBehaviorData();
  }

  private updateUserType() {
    const { sectionViews, timeSpent } = this.behavior;
    
    // Analyze viewing patterns to determine user type
    const projectsTime = timeSpent.projects || 0;
    const techStackTime = timeSpent.techStack || 0;
    const resumeTime = timeSpent.resume || 0;
    const blogTime = timeSpent.blog || 0;

    let userType: PersonalizationProfile['userType'] = 'general';
    
    if (resumeTime > projectsTime * 2) {
      userType = 'recruiter';
    } else if (techStackTime > (projectsTime + resumeTime)) {
      userType = 'developer';
    } else if (blogTime > (projectsTime + resumeTime) / 2) {
      userType = 'student';
    } else if (projectsTime > (resumeTime + techStackTime)) {
      userType = 'entrepreneur';
    }

    if (!this.profile) {
      this.profile = {
        userId: this.generateUserId(),
        userType,
        interests: [],
        skillLevel: 'intermediate',
        engagementScore: 0,
        lastVisit: new Date(),
        totalVisits: 1
      };
    } else {
      this.profile.userType = userType;
      this.profile.lastVisit = new Date();
      this.profile.totalVisits += 1;
    }

    this.saveUserProfile();
  }

  private updateEngagementScore() {
    if (!this.profile) return;

    const recentInteractions = this.behavior.interactions.filter(
      interaction => Date.now() - interaction.timestamp < 300000 // Last 5 minutes
    );

    this.profile.engagementScore = Math.min(100, recentInteractions.length * 2);
  }

  private generateRecommendations() {
    if (!this.profile) return;

    const { userType } = this.profile;
    const { sectionViews } = this.behavior;

    this.recommendations = [];

    switch (userType) {
      case 'recruiter':
        if (!sectionViews.achievements) {
          this.recommendations.push('Check out achievements and certifications');
        }
        if (!sectionViews.experience) {
          this.recommendations.push('View detailed work experience');
        }
        break;
      
      case 'developer':
        if (!sectionViews.projects) {
          this.recommendations.push('Explore technical projects and source code');
        }
        if (!sectionViews.blog) {
          this.recommendations.push('Read technical articles and insights');
        }
        break;
      
      case 'entrepreneur':
        this.recommendations.push('See project metrics and business impact');
        this.recommendations.push('Contact for collaboration opportunities');
        break;
      
      case 'student':
        this.recommendations.push('Check out learning resources and tutorials');
        this.recommendations.push('Explore beginner-friendly projects');
        break;
    }
  }

  getRecommendations(): string[] {
    return this.recommendations;
  }

  getUserProfile(): PersonalizationProfile | null {
    return this.profile;
  }

  getAdaptiveContent(sectionId: string): any {
    if (!this.profile) return null;

    const { userType, skillLevel } = this.profile;
    
    // Return different content based on user profile
    const adaptiveContent = {
      projects: {
        recruiter: { focus: 'business-impact', showMetrics: true },
        developer: { focus: 'technical-details', showCode: true },
        student: { focus: 'learning-process', showTutorials: true },
        entrepreneur: { focus: 'market-potential', showGrowth: true }
      },
      techStack: {
        beginner: { showDescriptions: true, highlightBasics: true },
        intermediate: { showExperience: true, balancedView: true },
        advanced: { showExpertise: true, focusOnInnovation: true }
      }
    };

    return adaptiveContent[sectionId]?.[userType] || adaptiveContent[sectionId]?.[skillLevel];
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  private saveBehaviorData() {
    localStorage.setItem('userBehavior', JSON.stringify(this.behavior));
  }

  private saveUserProfile() {
    if (this.profile) {
      localStorage.setItem('userProfile', JSON.stringify(this.profile));
    }
  }
}

export default PersonalizationEngine;
