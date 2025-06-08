import { 
  users, products, orders, orderItems, contactMessages, newsletterSubscriptions,
  type User, type InsertUser, type Product, type InsertProduct, 
  type Order, type InsertOrder, type OrderItem, type InsertOrderItem,
  type ContactMessage, type InsertContactMessage,
  type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  
  // Order item methods
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Newsletter subscription methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentContactMessageId: number;
  private currentNewsletterSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterSubscriptionId = 1;
    
    this.seedProducts();
  }

  private seedProducts() {
    const defaultProducts: InsertProduct[] = [
      {
        name: "Starter Pack",
        description: "3 Bottles - Perfect for trying Mintee",
        quantity: 3,
        price: "8.99",
        imageUrl: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isPopular: false
      },
      {
        name: "Family Pack",
        description: "6 Bottles - Great for regular enjoyment",
        quantity: 6,
        price: "16.99",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isPopular: true
      },
      {
        name: "Monthly Supply",
        description: "12 Bottles - Perfect monthly hydration",
        quantity: 12,
        price: "31.99",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isPopular: false
      },
      {
        name: "Office Pack",
        description: "24 Bottles - Great for sharing",
        quantity: 24,
        price: "59.99",
        imageUrl: "https://pixabay.com/get/g9d9b82c68ee038520bdf6a9af44ac48ff75cfa6740db292046a56d07d3287a297797dfb51b1f47cbd2ca965fe1dd0d2617097277d17989c6e3536ee0ae8ce836_1280.jpg",
        isPopular: false
      },
      {
        name: "Bulk Order",
        description: "48 Bottles - Best value for money",
        quantity: 48,
        price: "109.99",
        imageUrl: "https://images.unsplash.com/photo-1587536849024-daaa4a417b16?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isPopular: false
      }
    ];

    defaultProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  // Order item methods
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      item => item.orderId === orderId
    );
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  // Newsletter subscription methods
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.currentNewsletterSubscriptionId++;
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id, 
      createdAt: new Date() 
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
}

export const storage = new MemStorage();
