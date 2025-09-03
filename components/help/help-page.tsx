'use client';

import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How fast is the delivery?',
    answer: 'We deliver fresh groceries within 10-15 minutes in most areas. Our express delivery network ensures you get your essentials quickly.',
  },
  {
    question: 'What are the delivery charges?',
    answer: 'Delivery is absolutely free on all orders. No minimum order value required.',
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order in real-time from the Orders section. You\'ll receive SMS updates and can see live location of your delivery partner.',
  },
  {
    question: 'What if I receive damaged items?',
    answer: 'We have a 100% quality guarantee. If you receive any damaged items, contact us immediately and we\'ll replace them or provide a full refund.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Yes, you can cancel your order before it\'s dispatched. Once dispatched, cancellation may not be possible, but you can return items upon delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, Credit/Debit Cards, Digital Wallets, and Cash on Delivery. All payments are secure and encrypted.',
  },
];

const contactOptions = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    icon: MessageCircle,
    action: 'Start Chat',
    available: '24/7',
  },
  {
    title: 'Call Us',
    description: '+91 1800-123-4567',
    icon: Phone,
    action: 'Call Now',
    available: '6 AM - 12 AM',
  },
  {
    title: 'Email Support',
    description: 'support@ilbmart.com',
    icon: Mail,
    action: 'Send Email',
    available: 'Response in 2 hours',
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Help Center</h1>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option) => (
            <Card key={option.title} className="text-center card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.available}</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQs found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help you 24/7
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-primary hover:bg-primary/90">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}