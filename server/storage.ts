import { 
  users, products, orders, orderItems, contactMessages, newsletterSubscriptions,
  subscriptionPlans, subscriptions, subscriptionDeliveries,
  type User, type InsertUser, type Product, type InsertProduct, 
  type Order, type InsertOrder, type OrderItem, type InsertOrderItem,
  type ContactMessage, type InsertContactMessage,
  type NewsletterSubscription, type InsertNewsletterSubscription,
  type SubscriptionPlan, type InsertSubscriptionPlan,
  type Subscription, type InsertSubscription,
  type SubscriptionDelivery, type InsertSubscriptionDelivery
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  
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
  
  // Subscription plan methods
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
  
  // Subscription methods
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscription(id: number): Promise<Subscription | undefined>;
  getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined>;
  getUserSubscriptions(userId: number): Promise<Subscription[]>;
  updateSubscriptionStatus(id: number, status: string, cancelAtPeriodEnd?: boolean): Promise<Subscription>;
  
  // Subscription delivery methods
  createSubscriptionDelivery(delivery: InsertSubscriptionDelivery): Promise<SubscriptionDelivery>;
  getSubscriptionDeliveries(subscriptionId: number): Promise<SubscriptionDelivery[]>;
  updateDeliveryStatus(id: number, status: string, deliveredDate?: Date): Promise<SubscriptionDelivery>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private subscriptionPlans: Map<number, SubscriptionPlan>;
  private subscriptions: Map<number, Subscription>;
  private subscriptionDeliveries: Map<number, SubscriptionDelivery>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentContactMessageId: number;
  private currentNewsletterSubscriptionId: number;
  private currentSubscriptionPlanId: number;
  private currentSubscriptionId: number;
  private currentSubscriptionDeliveryId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    this.subscriptionPlans = new Map();
    this.subscriptions = new Map();
    this.subscriptionDeliveries = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterSubscriptionId = 1;
    this.currentSubscriptionPlanId = 1;
    this.currentSubscriptionId = 1;
    this.currentSubscriptionDeliveryId = 1;
    
    this.seedProducts();
    this.seedSubscriptionPlans();
  }

  private seedProducts() {
    const defaultProducts: InsertProduct[] = [
      {
        name: "Starter Pack",
        description: "3 Bottles - Perfect for trying Mintee",
        quantity: 3,
        price: "8.99",
        imageUrl: "/attached_assets/Three_Bottles_1749401611342.webp",
        isPopular: false
      },
      {
        name: "Family Pack",
        description: "6 Bottles - Great for regular enjoyment",
        quantity: 6,
        price: "16.99",
        imageUrl: "/attached_assets/Six_Bottles_1749401611341.webp",
        isPopular: true
      },
      {
        name: "Monthly Supply",
        description: "12 Bottles - Perfect monthly hydration",
        quantity: 12,
        price: "31.99",
        imageUrl: "/attached_assets/Twelve_Bottles_1749401611342.webp",
        isPopular: false
      },
      {
        name: "Office Pack",
        description: "24 Bottles - Great for sharing",
        quantity: 24,
        price: "59.99",
        imageUrl: "/attached_assets/Twelve_Bottles_1749401611342.webp",
        isPopular: false
      },
      {
        name: "Bulk Order",
        description: "48 Bottles - Best value for money",
        quantity: 48,
        price: "109.99",
        imageUrl: "/attached_assets/Twelve_Bottles_1749401611342.webp",
        isPopular: false
      }
    ];

    defaultProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  private seedSubscriptionPlans() {
    const defaultPlans: InsertSubscriptionPlan[] = [
      {
        name: "Weekly Refresh",
        description: "6 bottles delivered every week - never run out",
        price: "15.99",
        interval: "weekly",
        productQuantity: 6,
        productId: 2, // Family Pack
        stripePriceId: "price_weekly_6_bottles",
        isActive: true
      },
      {
        name: "Monthly Essential",
        description: "12 bottles delivered monthly - perfect routine",
        price: "29.99",
        interval: "monthly",
        productQuantity: 12,
        productId: 3, // Monthly Supply
        stripePriceId: "price_monthly_12_bottles",
        isActive: true
      },
      {
        name: "Quarterly Stock",
        description: "36 bottles delivered every 3 months - best value",
        price: "84.99",
        interval: "quarterly",
        productQuantity: 36,
        productId: 3, // Monthly Supply x3
        stripePriceId: "price_quarterly_36_bottles",
        isActive: true
      }
    ];

    defaultPlans.forEach(plan => {
      this.createSubscriptionPlan(plan);
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
    const user: User = { 
      ...insertUser, 
      id, 
      email: null, 
      stripeCustomerId: null, 
      stripeSubscriptionId: null 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }
    const updatedUser: User = {
      ...user,
      stripeCustomerId,
      stripeSubscriptionId: stripeSubscriptionId || user.stripeSubscriptionId
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
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

  // Subscription plan methods
  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values());
  }

  async getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined> {
    return this.subscriptionPlans.get(id);
  }

  async createSubscriptionPlan(insertPlan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = this.currentSubscriptionPlanId++;
    const plan: SubscriptionPlan = { 
      ...insertPlan, 
      id, 
      createdAt: new Date(),
      description: insertPlan.description || null,
      stripePriceId: insertPlan.stripePriceId || null,
      isActive: insertPlan.isActive ?? true
    };
    this.subscriptionPlans.set(id, plan);
    return plan;
  }

  // Subscription methods
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const subscription: Subscription = { 
      ...insertSubscription, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: insertSubscription.userId || null,
      planId: insertSubscription.planId || null,
      currentPeriodStart: insertSubscription.currentPeriodStart || null,
      currentPeriodEnd: insertSubscription.currentPeriodEnd || null,
      cancelAtPeriodEnd: insertSubscription.cancelAtPeriodEnd ?? false
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      sub => sub.stripeSubscriptionId === stripeSubscriptionId
    );
  }

  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(
      sub => sub.userId === userId
    );
  }

  async updateSubscriptionStatus(id: number, status: string, cancelAtPeriodEnd?: boolean): Promise<Subscription> {
    const subscription = this.subscriptions.get(id);
    if (!subscription) {
      throw new Error(`Subscription not found: ${id}`);
    }
    const updatedSubscription: Subscription = {
      ...subscription,
      status,
      cancelAtPeriodEnd: cancelAtPeriodEnd ?? subscription.cancelAtPeriodEnd,
      updatedAt: new Date()
    };
    this.subscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }

  // Subscription delivery methods
  async createSubscriptionDelivery(insertDelivery: InsertSubscriptionDelivery): Promise<SubscriptionDelivery> {
    const id = this.currentSubscriptionDeliveryId++;
    const delivery: SubscriptionDelivery = { 
      ...insertDelivery, 
      id, 
      createdAt: new Date(),
      subscriptionId: insertDelivery.subscriptionId || null,
      orderId: insertDelivery.orderId || null,
      deliveredDate: insertDelivery.deliveredDate || null,
      status: insertDelivery.status || "scheduled"
    };
    this.subscriptionDeliveries.set(id, delivery);
    return delivery;
  }

  async getSubscriptionDeliveries(subscriptionId: number): Promise<SubscriptionDelivery[]> {
    return Array.from(this.subscriptionDeliveries.values()).filter(
      delivery => delivery.subscriptionId === subscriptionId
    );
  }

  async updateDeliveryStatus(id: number, status: string, deliveredDate?: Date): Promise<SubscriptionDelivery> {
    const delivery = this.subscriptionDeliveries.get(id);
    if (!delivery) {
      throw new Error(`Delivery not found: ${id}`);
    }
    const updatedDelivery: SubscriptionDelivery = {
      ...delivery,
      status,
      deliveredDate: deliveredDate || delivery.deliveredDate
    };
    this.subscriptionDeliveries.set(id, updatedDelivery);
    return updatedDelivery;
  }
}

export const storage = new MemStorage();
