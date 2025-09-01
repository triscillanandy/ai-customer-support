import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { SupportOptions } from './SupportOptions';
import { TicketInfo } from './TicketInfo';
import { OrderDetails } from './OrderDetails';
import { QuickActions } from './QuickActions';
import type { Order } from './OrderDetails';

import { SendIcon, PaperclipIcon, SmileIcon, MicIcon } from 'lucide-react';

// Product type definition
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Product data
const products: Product[] = [
  { id: '1', name: 'Floral Summer Dress', price: 49.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', category: 'dresses' },
  { id: '2', name: 'Denim Jacket', price: 79.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', category: 'jackets' },
  { id: '3', name: 'Leather Boots Men', price: 129.99, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=300&fit=crop', category: 'shoes' },
  { id: '4', name: 'Summer Hat', price: 24.99, image: 'https://shop.bronerhats.com/CatalogImages/89-016Wheat.jpg', category: 'accessories' },
  { id: '5', name: 'Casual Sneakers', price: 59.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', category: 'shoes' },
  { id: '6', name: 'Silk Blouse', price: 45.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop', category: 'tops' },
  { id: '7', name: 'Silver Watch', price: 89.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'accessories' },
  { id: '8', name: 'Winter Coat', price: 149.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop', category: 'jackets' }
];

// Update the AI training data type definition
interface AITrainingDataItem {
  keywords: string[];
  response: string;
  suggestions: string[];
  products?: Product[];
}

interface AITrainingData {
  [key: string]: AITrainingDataItem;
}

// Update the aiTrainingData object to use the new type
const aiTrainingData: AITrainingData = {
  // Greetings
  greetings: {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
    response: "Hello! I'm Zazu, your AI support assistant. How can I help you today?",
    suggestions: ['How do I reset my password?', 'Where is my order?', 'Can I get a refund?', 'How to contact customer support?']
  },
  // Simple questions
  thanks: {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful'],
    response: "You're welcome! Is there anything else I can help you with?",
    suggestions: ['Track my order', 'Return an item', 'Change my account details', 'Speak to a human']
  },
  hours: {
    keywords: ['hour', 'time', 'open', 'close', 'when do you'],
    response: "Our support is available 24/7. Our physical stores are open from 9 AM to 9 PM, Monday to Saturday.",
    suggestions: ['Check store hours', 'Holiday hours', 'Contact store for hours', 'Store opening times']
  },
  location: {
    keywords: ['where', 'location', 'address', 'find you', 'store'],
    response: "We have locations in major cities nationwide. You can find our nearest store at https://www.example.com/store-locator",
    suggestions: ['Directions to store', 'Store phone number', 'Check product availability', 'Store services']
  },
  website: {
    keywords: ['website', 'site', 'online', 'portal'],
    response: "Our website is https://www.example.com. You can browse products, track orders, and manage your account there.",
    suggestions: ['Account login help', 'Browse products', 'Track order', 'Payment options']
  },
  account: {
    keywords: ['account', 'login', 'sign in', 'password', 'username'],
    response: "You can access your account at https://www.example.com/login. For password reset, click 'Forgot Password' on that page.",
    suggestions: ['Reset password', 'Update email', 'Change username', 'Delete account']
  },
  returnPolicy: {
    keywords: ['return', 'refund', 'exchange', 'policy'],
    response: "We offer a 30-day return policy for unused items with original packaging. Would you like to initiate a return?",
    suggestions: ['Start return process', 'Check return status', 'Exchange item', 'Return policy details']
  },
  shipping: {
    keywords: ['shipping', 'delivery', 'ship', 'arrive', 'when will'],
    response: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in most areas.",
    suggestions: ['Track package', 'Shipping options', 'Delivery timeframe', 'International shipping']
  },
  productInfo: {
    keywords: ['product', 'item', 'spec', 'feature', 'color', 'size'],
    response: "I can help with product information. Please provide the product name or ID for specific details.",
    suggestions: ['Product availability', 'Size guide', 'Product reviews', 'Alternative products']
  },
  // Product recommendations
  floralDresses: {
    keywords: ['floral dress', 'flower dress', 'summer dress', 'dress with flowers'],
    response: "Here are some beautiful floral dresses you might like:",
    suggestions: ['Show me more dresses', 'What sizes are available?', 'How about summer outfits?', 'Show me accessories'],
    products: products.filter(p => p.category === 'dresses' || p.name.toLowerCase().includes('floral'))
  },
  mensBoots: {
    keywords: ['men boots', 'mens boots', 'boots for men', 'leather boots'],
    response: "Here are some great men's boots options:",
    suggestions: ['Show me casual shoes', 'What about sneakers?', 'Show me winter boots', 'Price range?'],
    products: products.filter(p => p.category === 'shoes' && p.name.toLowerCase().includes('boot'))
  },
  cheapestProducts: {
    keywords: ['cheap', 'cheapest', 'affordable', 'budget', 'low price', 'inexpensive'],
    response: "Here are our most affordable options:",
    suggestions: ['Under $50', 'Under $100', 'Show me sales', 'Best value items'],
    products: products.filter(p => p.price < 60).sort((a, b) => a.price - b.price)
  },
  mensProducts: {
    keywords: ['men', 'mens', 'man', 'male'],
    response: "Here are some popular men's products:",
    suggestions: ['Men\'s clothing', 'Men\'s shoes', 'Men\'s accessories', 'Show me all men\'s items'],
    products: products.filter(p => p.name.toLowerCase().includes('men') || p.name.toLowerCase().includes('mens'))
  },
  womensProducts: {
    keywords: ['women', 'womens', 'woman', 'female', 'ladies'],
    response: "Here are some popular women's products:",
    suggestions: ['Women\'s clothing', 'Women\'s shoes', 'Women\'s accessories', 'Show me all women\'s items'],
    products: products.filter(p => !p.name.toLowerCase().includes('men') && !p.name.toLowerCase().includes('mens'))
  },
  // Picture recommendations
  pictureRecommendations: {
    keywords: ['picture', 'image', 'photo', 'visual', 'show me', 'look like', 'see'],
    response: "Based on your preferences, here are some recommendations:",
    suggestions: ['Show me more options', 'Different colors', 'Similar styles', 'Price range'],
    products: products.slice(0, 3) // Show first 3 products as recommendations
  }
};
// Complex issues that require a ticket
const complexIssueKeywords = [
  'broken', 'not working', 'defective', 'faulty', 'damaged', 'issue', 'problem',
  'complaint', 'not satisfied', 'angry', 'upset', 'disappointed', 'wrong item',
  'missing', 'didn\'t receive', 'never arrived', 'payment issue', 'overcharged',
  'double charge', 'billing problem', 'refund', 'return', 'exchange', 'legal',
  'sue', 'lawyer', 'attorney'
];

// Available agents with their specialties
const agents = [
  { id: 'agent1', name: 'Sarah Johnson', specialty: 'Billing Issues', available: true },
  { id: 'agent2', name: 'Michael Chen', specialty: 'Technical Support', available: true },
  { id: 'agent3', name: 'Emily Rodriguez', specialty: 'Order Issues', available: true },
  { id: 'agent4', name: 'David Smith', specialty: 'Returns & Refunds', available: false },
  { id: 'agent5', name: 'Jessica Williams', specialty: 'General Support', available: true }
];

// Mock order data
const orders: Order[] = [
  { orderNumber: 'ORD123456', name: 'Floral Dress', status: 'Shipped', deliveryDate: '2025-09-02', address: '123 Main St, Cityville' },
  { orderNumber: 'ORD654321', name: 'Denim Jacket', status: 'Delivered', deliveryDate: '2025-08-28', address: '456 Oak Ave, Townsville' },
  { orderNumber: 'ORD111222', name: 'Sneakers', status: 'Processing', deliveryDate: '2025-09-05', address: '789 Pine Rd, Villageburg' },
  { orderNumber: 'ORD333444', name: 'Leather Boots', status: 'Delivered', deliveryDate: '2025-08-25', address: '321 Maple St, Hamlet' },
  { orderNumber: 'ORD555666', name: 'Summer Hat', status: 'Shipped', deliveryDate: '2025-09-03', address: '654 Cedar Ave, Metropolis' }
];

type Message = {
  message: string;
  isAi: boolean;
  timestamp: string;
  file?: { name: string; url: string; type: string } | undefined;
  suggestions?: string[];
  products?: Product[];
};

// Cached messages to simulate previous conversation
const cachedMessages: Message[] = [
  {
    message: "Hi there! I'm looking for some summer clothing options.",
    isAi: false,
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    message: "Hello! I'd be happy to help you find some summer clothing. What type of items are you looking for?",
    isAi: true,
    timestamp: new Date(Date.now() - 3550000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: ['Dresses', 'Tops', 'Shorts', 'Swimwear']
  },
  {
    message: "I'm interested in dresses, preferably floral patterns.",
    isAi: false,
    timestamp: new Date(Date.now() - 3500000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    message: "Great choice! Floral dresses are perfect for summer. Here are some options:",
    isAi: true,
    timestamp: new Date(Date.now() - 3450000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    products: products.filter(p => p.category === 'dresses' && p.name.toLowerCase().includes('floral'))
  },
  {
    message: "These look nice! Can you show me what accessories would go well with the Floral Summer Dress?",
    isAi: false,
    timestamp: new Date(Date.now() - 3400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    message: "Absolutely! Here are some accessories that would complement the Floral Summer Dress:",
    isAi: true,
    timestamp: new Date(Date.now() - 3350000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    products: products.filter(p => p.category === 'accessories').slice(0, 3)
  }
];

const initialMessages: Message[] = [
  {
    message: "Welcome back! I'm Zazu, your AI support assistant. How can I help you today?",
    isAi: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    file: undefined,
   suggestions: ['How do I reset my password?', 'Where is my order?', 'Can I get a refund?', 'How to contact customer support?']
  
  }
];

// Issue types for better categorization
const ISSUE_TYPES = {
  DAMAGED_ITEM: 'damaged_item',
  WRONG_ITEM: 'wrong_item',
  MISSING_ITEM: 'missing_item',
  BILLING_ISSUE: 'billing_issue',
  OTHER: 'other'
};

// Issue keywords mapping
const ISSUE_KEYWORDS = {
  [ISSUE_TYPES.DAMAGED_ITEM]: ['damaged', 'broken', 'defective', 'not working', 'scratched'],
  [ISSUE_TYPES.WRONG_ITEM]: ['wrong item', 'incorrect', 'different product', 'not what i ordered','wrong','mismatch','mismatched','wrong order'],
  [ISSUE_TYPES.MISSING_ITEM]: ['missing', 'didn\'t receive', 'never arrived', 'not delivered'],
  [ISSUE_TYPES.BILLING_ISSUE]: ['payment', 'charge', 'billing', 'overcharged', 'double charge'],
};

export function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load cached messages from localStorage if available
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    // Otherwise, use initial messages with cached conversation history
    return [...cachedMessages, ...initialMessages];
  });
  const [aiTyping, setAiTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [assignedAgent, setAssignedAgent] = useState<any>(null);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [currentIssue, setCurrentIssue] = useState<string | null>(null);
  const [awaitingOrderNumber, setAwaitingOrderNumber] = useState(false);
  const [awaitingImageUpload, setAwaitingImageUpload] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [showCachedHistory, setShowCachedHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate a random ticket number
  const generateTicketNumber = () => {
    return `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  // Find the most suitable available agent based on keywords
  const findSuitableAgent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check agent specialties against the message
    const availableAgents = agents.filter(agent => agent.available);
    
    if (availableAgents.length === 0) {
      return null; // No agents available
    }
    
    // Simple keyword matching for agent assignment
    if (lowerMessage.includes('payment') || lowerMessage.includes('bill') || lowerMessage.includes('charge')) {
      return availableAgents.find(agent => agent.specialty === 'Billing Issues') || availableAgents[0];
    }
    
    if (lowerMessage.includes('order') || lowerMessage.includes('delivery') || lowerMessage.includes('ship')) {
      return availableAgents.find(agent => agent.specialty === 'Order Issues') || availableAgents[0];
    }
    
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('exchange')) {
      return availableAgents.find(agent => agent.specialty === 'Returns & Refunds') || availableAgents[0];
    }
    
    if (lowerMessage.includes('technical') || lowerMessage.includes('not working') || lowerMessage.includes('broken')) {
      return availableAgents.find(agent => agent.specialty === 'Technical Support') || availableAgents[0];
    }
    
    // Default to first available agent
    return availableAgents[0];
  };

  // Check if the message indicates a complex issue requiring a ticket
  const requiresTicket = (message: string) => {
    const lowerMessage = message.toLowerCase();
    return complexIssueKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  // Check if AI can handle this message based on training data
  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check against training data
    for (const [category, data] of Object.entries(aiTrainingData)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return {
          response: data.response,
          suggestions: data.suggestions,
          products: data.products,
          category: category
        };
      }
    }
    
    // Default response if no match found
    return {
      response: "I'm not sure I understand. Could you please provide more details?",
      suggestions: ['How do I reset my password?', 'Where is my order?', 'Can I get a refund?', 'How to contact customer support?']
    };
  };

  // Create a support ticket with the appropriate agent assignment
  const createSupportTicket = (issueType: string, orderNumber?: string, imageUrl?: string) => {
    const newTicket = generateTicketNumber();
    setTicketNumber(newTicket);
    
    // Find a suitable agent based on issue type
    let agent = null;
    
    switch(issueType) {
      case ISSUE_TYPES.DAMAGED_ITEM:
      case ISSUE_TYPES.WRONG_ITEM:
      case ISSUE_TYPES.MISSING_ITEM:
        agent = agents.find(a => a.specialty === 'Returns & Refunds') || 
                agents.find(a => a.available) || 
                agents[0];
        break;
      case ISSUE_TYPES.BILLING_ISSUE:
        agent = agents.find(a => a.specialty === 'Billing Issues') || 
                agents.find(a => a.available) || 
                agents[0];
        break;
      default:
        agent = agents.find(a => a.available) || agents[0];
    }
    
    setAssignedAgent(agent);
    
    let responseMessage = `I've created support ticket ${newTicket} for you. `;
    
    if (orderNumber) {
      responseMessage += `Your order ${orderNumber} has been linked to this ticket. `;
    }
    
    if (imageUrl) {
      responseMessage += "The image you provided has been attached to the ticket. ";
    }
    
    responseMessage += `${agent ? `${agent.name} has been assigned to your case and will contact you shortly.` : 'Our next available agent will contact you shortly.'}`;
    
    return responseMessage;
  };

  // Detect issue type based on keywords
  const detectIssueType = (message: string): string => {
    const lowerMsg = message.toLowerCase();

    for (const [issueType, keywords] of Object.entries(ISSUE_KEYWORDS)) {
      if (keywords.some(keyword => lowerMsg.includes(keyword))) {
        return issueType;
      }
    }

    // If no specific match but still looks like a problem
    if (requiresTicket(message)) return ISSUE_TYPES.OTHER;

    return ''; // Means AI can just respond normally
  };

  // Handle quick action selection
  const handleQuickAction = (suggestion: string) => {
    setInputValue(suggestion);
    sendMessage(suggestion);
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setInputValue(`Tell me more about ${product.name}`);
    sendMessage(`Tell me more about ${product.name}`);
  };

  // Handle sending message
  const sendMessage = (text: string, file?: File) => {
    if (!text.trim() && !file) return;

    const filePreview = file
      ? {
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }
      : undefined;

    const userMsg = {
      message: text,
      isAi: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: filePreview
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setShowOptions(false);

    // Check if input is a number corresponding to an option
    const optionId = parseInt(text);
    if (!isNaN(optionId) && optionId >= 1 && optionId <= 5) {
      handleOptionSelect(optionId);
      return;
    }

    // Detect issue type from user input
    const detectedIssue = detectIssueType(text);

    if (detectedIssue) {
      setCurrentIssue(detectedIssue);

      switch(detectedIssue) {
        case ISSUE_TYPES.MISSING_ITEM:
          setMessages(prev => [...prev, {
            message: "I'm sorry your order hasn't arrived yet. Please provide your order number (like ORD123456) so I can track it for you and create a support ticket.",
            isAi: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: undefined
          }]);
          setAwaitingOrderNumber(true);
          return;

        case ISSUE_TYPES.WRONG_ITEM:
          setMessages(prev => [...prev, {
            message: "Oh no! You received the wrong item. Please provide your order number (like ORD123456) so I can create a support ticket for you.",
            isAi: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: undefined
          }]);
          setAwaitingOrderNumber(true);
          return;

        case ISSUE_TYPES.DAMAGED_ITEM:
          setMessages(prev => [...prev, {
            message: "I'm sorry to hear you received a damaged product. Please upload a photo of the damage so we can better assist you.",
            isAi: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: undefined
          }]);
          setAwaitingImageUpload(true);
          return;

        case ISSUE_TYPES.BILLING_ISSUE:
          setMessages(prev => [...prev, {
            message: "Let's resolve your payment issue. Please provide your order number and transaction details.",
            isAi: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: undefined
          }]);
          setAwaitingOrderNumber(true);
          return;
          
        case ISSUE_TYPES.OTHER:
          const newTicket = generateTicketNumber();
          setTicketNumber(newTicket);
          const agent = agents.find(a => a.available) || agents[0];
          setAssignedAgent(agent);
          setMessages(prev => [...prev, {
            message: `I understand this is a complex issue. I've created support ticket ${newTicket} for you. ${agent.name} has been assigned to your case and will contact you shortly.`,
            isAi: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: undefined
          }]);
          return;
      }
    }

    // Handle case where we're awaiting an order number
    if (awaitingOrderNumber) {
      setAwaitingOrderNumber(false);
      const orderMatch = text.match(/ORD\d{6}/i);
      
      if (orderMatch) {
        const order = orders.find(o => o.orderNumber.toLowerCase() === orderMatch[0].toLowerCase());
        if (order) {
          setFoundOrder(order);
          setAiTyping(true);
          
          setTimeout(() => {
            // Create a ticket for the reported issue
            const response = createSupportTicket(
              currentIssue || ISSUE_TYPES.OTHER, 
              order.orderNumber, 
              uploadedImageUrl || undefined
            );
            
            setMessages(prev => [
              ...prev,
              {
                message: `Order ${order.orderNumber} found! ${response}`,
                isAi: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                file: undefined
              }
            ]);
            
            setAiTyping(false);
            setUploadedImageUrl(null); // Reset the uploaded image URL
          }, 1200);
        } else {
          setAiTyping(true);
          
          setTimeout(() => {
            const agent = agents.find(a => a.available) || agents[0];
            setAssignedAgent(agent);
            
            setMessages(prev => [
              ...prev,
              {
                message: `Sorry, we couldn't find that order number. I've still created a ticket for your issue and ${agent.name} will assist you.`,
                isAi: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                file: undefined
              }
            ]);
            
            setAiTyping(false);
            setUploadedImageUrl(null); // Reset the uploaded image URL
          }, 1200);
        }
      } else {
        setAiTyping(true);
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              message: "That doesn't look like a valid order number. Please provide your order number in the format ORD123456.",
              isAi: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              file: undefined
            }
          ]);
          
          setAwaitingOrderNumber(true);
          setAiTyping(false);
        }, 1200);
      }
      
      return;
    }

    // Handle case where we're awaiting an image upload
    if (awaitingImageUpload) {
      if (file) {
        setAwaitingImageUpload(false);
        setAiTyping(true);
        
        // Store the image URL for later use when creating the ticket
        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              message: "Thank you for providing the image. I'm sorry to see the product arrived damaged. Please provide your order number so I can create a support ticket for you.",
              isAi: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              file: undefined
            }
          ]);
          
          setAwaitingOrderNumber(true);
          setAiTyping(false);
        }, 1200);
      } else if (text.trim()) {
        // If user sent text instead of image
        setAiTyping(true);
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              message: "I understand you're reporting a damaged product. Please upload an image of the damage so we can better assist you.",
              isAi: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              file: undefined
            }
          ]);
          
          setAwaitingImageUpload(true);
          setAiTyping(false);
        }, 1200);
      }
      
      return;
    }

    // Check for order number pattern in regular messages
    const orderMatch = text.match(/ORD\d{6}/i);
    setAiTyping(true);

    setTimeout(() => {
      if (orderMatch) {
        const order = orders.find(o => o.orderNumber.toLowerCase() === orderMatch[0].toLowerCase());
        if (order) {
          setFoundOrder(order);
          setMessages(prev => [
            ...prev,
            {
              message: `I found your order ${order.orderNumber}. How can I help you with this order?`,
              isAi: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              file: undefined,
              suggestions: ['Track this order', 'Return this item', 'Problem with this order', 'Change delivery address']
            }
          ]);
        } else {
          const agent = agents.find(a => a.available) || agents[0];
          setAssignedAgent(agent);
          setMessages(prev => [
            ...prev,
            {
              message: `Sorry, we couldn't find that order number. ${agent ? agent.name + ' will assist you.' : 'Our next available agent will assist you.'}`,
              isAi: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              file: undefined
            }
          ]);
        }
      } else {
        // Simulate AI processing
        setAiTyping(true);
        setTimeout(() => {
          // Check if this requires a ticket
          if (requiresTicket(text)) {
            const newTicket = generateTicketNumber();
            setTicketNumber(newTicket);
            
            // Find a suitable agent
            const agent = findSuitableAgent(text);
            setAssignedAgent(agent);
            
            setMessages(prev => [
              ...prev,
              {
                message: `I understand this is a complex issue. I've created support ticket ${newTicket} for you. ${agent ? `${agent.name} has been assigned to your case and will contact you shortly.` : 'Our next available agent will contact you shortly.'}`,
                isAi: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                file: undefined
              }
            ]);
          } else {
            // AI can handle this without a ticket
            const aiResponse = getAIResponse(text);
            const isGreeting = aiResponse.response.includes("I'm Zazu, your AI support assistant");

            setMessages(prev => [
              ...prev,
              {
                message: aiResponse.response,
                isAi: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                file: undefined,
                suggestions: aiResponse.suggestions,
                products: aiResponse.products
              }
            ]);
            if (isGreeting) {
              setShowOptions(true);
            }
          }
          
          setAiTyping(false);
          setShowOptions(false);
        }, 1200);
      }
    }, 1200);
  };

  // Handle option selection
  const handleOptionSelect = (optionId: number) => {
    setAiTyping(true);
    
    setTimeout(() => {
      let response = "";
      let issueType = ISSUE_TYPES.OTHER;
      let suggestions: string[] = [];
      
      switch(optionId) {
        case 1:
          response = "I'm sorry your order hasn't arrived yet. Please provide your order number (like ORD123456) so I can track it for you and create a support ticket.";
          setAwaitingOrderNumber(true);
          issueType = ISSUE_TYPES.MISSING_ITEM;
          break;
        case 2:
          response = "Oh no! You received the wrong item. Please provide your order number (like ORD123456) so I can create a support ticket for you.";
          setAwaitingOrderNumber(true);
          issueType = ISSUE_TYPES.WRONG_ITEM;
          break;
        case 3:
          response = "I'm sorry to hear you received a damaged product. Please upload a photo of the damage so we can better assist you.";
          setAwaitingImageUpload(true);
          issueType = ISSUE_TYPES.DAMAGED_ITEM;
          break;
        case 4:
          response = "Let's resolve your payment issue. Please provide your order number and transaction details.";
          setAwaitingOrderNumber(true);
          issueType = ISSUE_TYPES.BILLING_ISSUE;
          break;
        case 5:
          const newTicket = generateTicketNumber();
          setTicketNumber(newTicket);
          const agent = agents.find(a => a.available) || agents[0];
          setAssignedAgent(agent);
          response = `I'm connecting you with our support team. Your ticket number is ${newTicket}. ${agent.name} has been assigned to your case and will contact you shortly.`;
          suggestions = ['Check ticket status', 'Add more details to ticket', 'Contact agent directly', 'Browse help articles'];
          break;
        default:
          response = "I'm not sure how to help with that. Could you please provide more details?";
      }
      
      setCurrentIssue(issueType);
      
      setMessages(prev => [
        ...prev,
        {
          message: response,
          isAi: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          file: undefined,
          suggestions
        }
      ]);
      setAiTyping(false);
      
      // Don't show options again if we're awaiting input
      if (!awaitingOrderNumber && !awaitingImageUpload) {
        setTimeout(() => setShowOptions(true), 500);
      }
    }, 1000);
  };

  // Handle file attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (awaitingImageUpload) {
        sendMessage('', file);
      } else {
        // Add a message indicating the file was uploaded
        const userMsg = {
          message: "[Attached a file]",
          isAi: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          file: {
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type
          }
        };
        
        setMessages(prev => [...prev, userMsg]);
        
        setAiTyping(true);
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              message: "Thank you for sharing the file. How can I help you with this?",
              isAi: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              file: undefined,
              suggestions: ['Analyze this document', 'Share with support agent', 'Save to my account', 'Related help articles']
            }
          ]);
          setAiTyping(false);
        }, 1000);
      }
    }
  };

  // Toggle showing cached history
  const toggleCachedHistory = () => {
    setShowCachedHistory(!showCachedHistory);
  };

  // Clear chat history
  const clearChatHistory = () => {
    setMessages(initialMessages);
    localStorage.setItem('chatMessages', JSON.stringify(initialMessages));
  };

return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header - Fixed position */}
      <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center flex-shrink-0 sticky top-0 z-10">
        <div>
          <h2 className="text-lg font-medium text-gray-800">Customer Support</h2>
          <p className="text-sm text-gray-500">Zazu AI Assistant • Online</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={toggleCachedHistory}
            className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200"
          >
            {showCachedHistory ? 'Hide History' : 'Show History'}
          </button>
          <button 
            onClick={clearChatHistory}
            className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200"
          >
            Clear Chat
          </button>
        </div>
        <TicketInfo ticketNumber={ticketNumber} agent={assignedAgent} />
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {/* Cached messages with timestamp */}
          {showCachedHistory && (
            <div className="mb-4">
              <div className="text-center text-xs text-gray-500 my-2">
                Earlier conversation
              </div>
              {cachedMessages.map((msg, index) => (
                <div key={`cached-${index}`}>
                  <MessageBubble
                    message={msg.message}
                    isAi={msg.isAi}
                    timestamp={msg.timestamp}
                    file={msg.file}
                  />
                  {(msg.suggestions || msg.products) && (
                    <div className="mt-2 mb-4">
                      <QuickActions 
                        suggestions={msg.suggestions || []} 
                        products={msg.products}
                        onSelect={handleQuickAction}
                        onProductSelect={handleProductSelect}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="text-center text-xs text-gray-500 my-2">
                Current conversation
              </div>
            </div>
          )}
          
          {/* Message bubbles */}
          {messages.map((msg, index) => (
            <div key={index}>
              <MessageBubble
                message={msg.message}
                isAi={msg.isAi}
                timestamp={msg.timestamp}
                file={msg.file}
              />
              {(msg.suggestions || msg.products) && (
                <div className="mt-2 mb-4">
                  <QuickActions 
                    suggestions={msg.suggestions || []} 
                    products={msg.products}
                    onSelect={handleQuickAction}
                    onProductSelect={handleProductSelect}
                  />
                </div>
              )}
            </div>
          ))}
          {foundOrder && <OrderDetails order={foundOrder} />}
          {showOptions && <SupportOptions onSelect={id => { setInputValue(id.toString()); sendMessage(id.toString()); }} />}
          {/* AI typing indicator */}
          {aiTyping && (
            <div className="flex items-center mt-4 text-gray-400 text-sm">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-2">Zazu is typing...</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - Fixed at bottom */}
    <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
          {/* Attach file */}
          <button
            className="text-gray-400 hover:text-gray-600 mr-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon className="h-5 w-5" />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </button>

          {/* Message input */}
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={
              awaitingOrderNumber ? "Please enter your order number (e.g., ORD123456)..." :
              awaitingImageUpload ? "Please upload an image of the damaged product..." :
              "Type a number or your message..."
            }
            className="flex-1 py-1 px-2 focus:outline-none"
            onKeyDown={e => {
              if (e.key === 'Enter') sendMessage(inputValue);
            }}
          />

          {/* Emojis / Mic / Send */}
          <button className="text-gray-400 hover:text-gray-600 mx-2">
            <SmileIcon className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 mr-2">
            <MicIcon className="h-5 w-5" />
          </button>
          <button
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
            onClick={() => sendMessage(inputValue)}
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Zazu can answer most questions instantly. For complex issues, I'll create a ticket and connect you with a human agent.
        </p>
      </div>
    </div>
  );
}