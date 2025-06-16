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

  private async seedProducts() {
    // To ensure the new data is seeded, we'll clear existing products on restart.
    if ((await this.getAllProducts()).length > 0) {
      this.products.clear();
      this.currentProductId = 1;
    }
    console.log("Seeding products...");

    const placeholderImage = "https://ik.imagekit.io/boostkit/Mintee/Three_Bottles.webp?updatedAt=1749408731560";

    await this.createProduct({
      name: "Starter Pack",
      description: "3 Bottle Pack - Perfect for trying Mintee",
      price: "6.30",
      quantity: 3,
      imageUrl: placeholderImage,
      isPopular: false,
    });
    await this.createProduct({
      name: "Family Pack",
      description: "6 Bottle Pack - Great for sharing",
      price: "11.50",
      quantity: 6,
      imageUrl: placeholderImage,
      isPopular: true,
    });
    await this.createProduct({
      name: "Value Pack",
      description: "12 Bottle Pack - Best value for regular drinkers",
      price: "23.60",
      quantity: 12,
      imageUrl: placeholderImage,
      isPopular: false,
    });
  }

  private seedSubscriptionPlans() {
    const defaultPlans: InsertSubscriptionPlan[] = [
      {
        name: "Weekly Delivery",
        description: "Fresh Mintee delivered to your door every week",
        price: "11",
        interval: "weekly",
        productQuantity: 6,
        productId: 2,
        stripePriceId: "price_weekly_6_bottles",
        isActive: true
      },
      {
        name: "Monthly Delivery",
        description: "Monthly supply of refreshing Mintee water",
        price: "40",
        interval: "monthly",
        productQuantity: 24,
        productId: 4,
        stripePriceId: "price_monthly_24_bottles",
        isActive: true
      },
      {
        name: "Quarterly Delivery",
        description: "Stock up with our best value quarterly plan",
        price: "100",
        interval: "quarterly",
        productQuantity: 72,
        productId: 4, 
        stripePriceId: "price_quarterly_72_bottles",
        isActive: true
      }
    ];

    defaultPlans.forEach(plan => {
      const id = this.currentSubscriptionPlanId++;
      const processedPlan: SubscriptionPlan = { 
        ...plan, 
        id, 
        createdAt: new Date(),
        description: plan.description || null,
        stripePriceId: plan.stripePriceId || null,
        isActive: plan.isActive ?? true,
        productId: plan.productId || null
      };
      this.subscriptionPlans.set(id, processedPlan);
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
    const product: Product = { 
      ...insertProduct, 
      id,
      description: insertProduct.description || null,
      imageUrl: insertProduct.imageUrl || null,
      isPopular: insertProduct.isPopular ?? false
    };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date(),
      status: insertOrder.status || "pending",
      customerPhone: insertOrder.customerPhone || null
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
    const orderItem: OrderItem = { 
      ...insertOrderItem, 
      id,
      orderId: insertOrderItem.orderId || null,
      productId: insertOrderItem.productId || null
    };
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
      createdAt: new Date(),
      newsletter: insertMessage.newsletter ?? false
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
      isActive: insertPlan.isActive ?? true,
      productId: insertPlan.productId || null
    };
    this.subscriptionPlans.set(id, plan);
    return plan;
  }

  // Subscription methods
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const now = new Date();

    const subscription: Subscription = {
      id,
      createdAt: now,
      updatedAt: now,
      userId: insertSubscription.userId ?? null,
      planId: insertSubscription.planId ?? null,
      stripeCustomerId: insertSubscription.stripeCustomerId,
      stripeSubscriptionId: insertSubscription.stripeSubscriptionId,
      status: insertSubscription.status,
      deliveryAddress: insertSubscription.deliveryAddress,
      currentPeriodStart: insertSubscription.currentPeriodStart ?? null,
      currentPeriodEnd: insertSubscription.currentPeriodEnd ?? null,
      cancelAtPeriodEnd: insertSubscription.cancelAtPeriodEnd ?? null,
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
