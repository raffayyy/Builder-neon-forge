import { Request, Response } from 'express';
import { SiteSettingsModel } from '../models/SiteSettingsModel';

export class SiteSettingsController {
  static async get(req: Request, res: Response): Promise<void> {
    try {
      const settings = await SiteSettingsModel.get();

      if (!settings) {
        // Create default settings if none exist
        const defaultSettings = {
          general: {
            siteName: "Portfolio",
            tagline: "Building the Future",
            description: "A modern portfolio showcasing innovative projects and expertise",
            logo: "",
            favicon: ""
          },
          contact: {
            email: "contact@portfolio.com",
            phone: "",
            location: "",
            socialLinks: {
              github: "https://github.com",
              linkedin: "https://linkedin.com",
              twitter: "https://twitter.com"
            }
          },
          theme: {
            primaryColor: "#3b82f6",
            secondaryColor: "#8b5cf6",
            accentColor: "#06b6d4",
            darkMode: true
          },
          layout: {
            sections: [
              { id: "hero", name: "Hero", enabled: true, order: 1 },
              { id: "about", name: "About", enabled: true, order: 2 },
              { id: "projects", name: "Projects", enabled: true, order: 3 },
              { id: "experience", name: "Experience", enabled: true, order: 4 },
              { id: "testimonials", name: "Testimonials", enabled: true, order: 5 },
              { id: "contact", name: "Contact", enabled: true, order: 6 }
            ],
            containerWidth: "normal" as const,
            spacing: "normal" as const,
            borderRadius: "medium" as const
          },
          seo: {
            defaultTitle: "Portfolio | Building the Future",
            defaultDescription: "A modern portfolio showcasing innovative projects and expertise",
            defaultKeywords: ["portfolio", "developer", "projects", "web development"],
            ogImage: "",
            twitterCard: "summary_large_image" as const,
            structuredData: {}
          }
        };

        const newSettings = await SiteSettingsModel.create(defaultSettings);
        res.status(200).json({
          success: true,
          data: newSettings
        });
      }

      res.status(200).json({
        success: true,
        data: settings
      });
    } catch (error) {
      console.error('Get site settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const settingsData = req.body;
      const settings = await SiteSettingsModel.update(settingsData);

      if (!settings) {
        res.status(404).json({
          success: false,
          error: 'Site settings not found'
        });
      }

      res.status(200).json({
        success: true,
        data: settings,
        message: 'Site settings updated successfully'
      });
    } catch (error) {
      console.error('Update site settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async updateGeneral(req: Request, res: Response): Promise<void> {
    try {
      const generalData = req.body;
      const settings = await SiteSettingsModel.update({ general: generalData });

      if (!settings) {
        res.status(404).json({
          success: false,
          error: 'Site settings not found'
        });
      }

      res.status(200).json({
        success: true,
        data: settings,
        message: 'General settings updated successfully'
      });
    } catch (error) {
      console.error('Update general settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async updateContact(req: Request, res: Response): Promise<void> {
    try {
      const contactData = req.body;
      const settings = await SiteSettingsModel.update({ contact: contactData });

      if (!settings) {
        res.status(404).json({
          success: false,
          error: 'Site settings not found'
        });
      }

      res.status(200).json({
        success: true,
        data: settings,
        message: 'Contact settings updated successfully'
      });
    } catch (error) {
      console.error('Update contact settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async updateTheme(req: Request, res: Response): Promise<void> {
    try {
      const themeData = req.body;
      const settings = await SiteSettingsModel.update({ theme: themeData });

      if (!settings) {
        res.status(404).json({
          success: false,
          error: 'Site settings not found'
        });
      }

      res.status(200).json({
        success: true,
        data: settings,
        message: 'Theme settings updated successfully'
      });
    } catch (error) {
      console.error('Update theme settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async updateLayout(req: Request, res: Response): Promise<void> {
    try {
      const layoutData = req.body;
      const settings = await SiteSettingsModel.update({ layout: layoutData });

      if (!settings) {
        res.status(404).json({
          success: false,
          error: 'Site settings not found'
        });
      }

      res.status(200).json({
        success: true,
        data: settings,
        message: 'Layout settings updated successfully'
      });
    } catch (error) {
      console.error('Update layout settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async updateSEO(req: Request, res: Response): Promise<void> {
    try {
      const seoData = req.body;
      const settings = await SiteSettingsModel.update({ seo: seoData });

      if (!settings) {
        res.status(404).json({
          success: false,
          error: 'Site settings not found'
        });
      }

      res.status(200).json({
        success: true,
        data: settings,
        message: 'SEO settings updated successfully'
      });
    } catch (error) {
      console.error('Update SEO settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
