'use client';

import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { mockBooks } from '@/lib/mock-books';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { BookOpen } from 'lucide-react';

export default function LibraryPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...Array.from(new Set(mockBooks.map(book => book.category)))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Online Library</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.name}! Your student ID grants you access to our digital collection.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Browse Books</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Input
              placeholder="Search by title or author..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'secondary'}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBooks.map(book => (
                <Card key={book.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      width={300}
                      height={400}
                      className="rounded-t-lg aspect-[3/4] object-cover"
                      data-ai-hint="book cover"
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-4 space-y-1">
                    <CardTitle className="text-base font-semibold leading-tight">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No books found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
