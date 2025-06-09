export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

class NewsService {
  private readonly API_KEY = "YOUR_NEWS_API_KEY"; // You'll need to get this from newsapi.org
  private readonly BASE_URL = "https://newsapi.org/v2";
  private readonly FALLBACK_NEWS: NewsArticle[] = [
    {
      id: "1",
      title: "New JavaScript Framework Revolutionizes Frontend Development",
      description:
        "A breakthrough framework combining the best of React and Vue.js approaches, offering unprecedented developer experience and performance optimizations.",
      url: "https://example.com/news/javascript-framework",
      urlToImage: "/placeholder.svg",
      publishedAt: "2025-06-08T10:00:00Z",
      source: { name: "TechCrunch" },
      author: "Sarah Developer",
    },
    {
      id: "2",
      title: "AI-Powered Code Completion Reaches 95% Accuracy",
      description:
        "Latest advancements in AI coding assistants show remarkable improvement in code suggestion accuracy, transforming how developers write code.",
      url: "https://example.com/news/ai-code-completion",
      urlToImage: "/placeholder.svg",
      publishedAt: "2025-06-07T14:30:00Z",
      source: { name: "Wired" },
      author: "Alex Technology",
    },
    {
      id: "3",
      title: "WebAssembly Adoption Surges in Enterprise Applications",
      description:
        "Major enterprises are increasingly adopting WebAssembly for performance-critical web applications, leading to significant speed improvements.",
      url: "https://example.com/news/webassembly-enterprise",
      urlToImage: "/placeholder.svg",
      publishedAt: "2025-06-06T09:15:00Z",
      source: { name: "The Verge" },
      author: "Mike Enterprise",
    },
    {
      id: "4",
      title: "TypeScript 6.0 Introduces Revolutionary Type System",
      description:
        "The latest TypeScript release brings advanced type inference and compile-time optimizations that dramatically improve developer productivity.",
      url: "https://example.com/news/typescript-6",
      urlToImage: "/placeholder.svg",
      publishedAt: "2025-06-05T16:45:00Z",
      source: { name: "Dev.to" },
      author: "TypeScript Team",
    },
    {
      id: "5",
      title: "Cloud Computing Costs Drop 40% with New Optimization Tools",
      description:
        "Revolutionary cloud optimization platforms help companies reduce infrastructure costs while maintaining performance and reliability.",
      url: "https://example.com/news/cloud-optimization",
      urlToImage: "/placeholder.svg",
      publishedAt: "2025-06-04T11:20:00Z",
      source: { name: "InfoWorld" },
      author: "Cloud Expert",
    },
    {
      id: "6",
      title: "Quantum Computing Breakthrough Accelerates Cryptography",
      description:
        "New quantum algorithms promise to revolutionize encryption and security protocols across the technology industry.",
      url: "https://example.com/news/quantum-computing",
      urlToImage: "/placeholder.svg",
      publishedAt: "2025-06-03T13:10:00Z",
      source: { name: "MIT Technology Review" },
      author: "Quantum Researcher",
    },
  ];

  async fetchTechNews(
    category: string = "technology",
    pageSize: number = 20,
  ): Promise<NewsResponse> {
    try {
      // For demo purposes, we'll return fallback news
      // In production, uncomment the actual API call below:

      /*
      const response = await fetch(
        `${this.BASE_URL}/top-headlines?category=${category}&pageSize=${pageSize}&apiKey=${this.API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      return {
        articles: data.articles.map((article: any) => ({
          ...article,
          id: article.url // Use URL as unique ID
        })),
        totalResults: data.totalResults
      };
      */

      // Return fallback data for demo
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      return {
        articles: this.FALLBACK_NEWS,
        totalResults: this.FALLBACK_NEWS.length,
      };
    } catch (error) {
      console.error("Error fetching tech news:", error);
      return {
        articles: this.FALLBACK_NEWS,
        totalResults: this.FALLBACK_NEWS.length,
      };
    }
  }

  async searchNews(
    query: string,
    pageSize: number = 20,
  ): Promise<NewsResponse> {
    try {
      // For demo purposes, filter fallback news by query
      const filteredNews = this.FALLBACK_NEWS.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase()),
      );

      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
      return {
        articles: filteredNews.slice(0, pageSize),
        totalResults: filteredNews.length,
      };
    } catch (error) {
      console.error("Error searching news:", error);
      return {
        articles: [],
        totalResults: 0,
      };
    }
  }
}

export const newsService = new NewsService();
