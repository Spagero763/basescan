"use client";

import { useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { tokens as mockTokens } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const tokenSchema = z.object({
  address: z.string().startsWith("0x", "Address must start with 0x.").length(42, "Address must be 42 characters long."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  volume: z.coerce.number().min(0, "Volume must be a positive number."),
  marketCap: z.coerce.number().min(0, "Market Cap must be a positive number."),
});

const formSchema = z.object({
  tokens: z.array(tokenSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateTokenPrices() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokens: mockTokens.slice(0, 1).map(t => ({ address: t.address, price: t.price, volume: t.volume, marketCap: t.marketCap })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tokens",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    console.log("Submitting token data:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast({
      title: "Success!",
      description: "Token prices have been updated.",
    });
  };

  return (
     <Card className="bg-transparent border-0 shadow-none">
       <CardHeader className="p-0 mb-2">
          <CardTitle className="text-base font-headline">Update Token Prices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-2 gap-2 items-end p-2 border rounded-lg relative bg-background">
                      <FormField
                        control={form.control}
                        name={`tokens.${index}.address`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel className="text-xs">Token Address</FormLabel>
                            <FormControl>
                              <Input placeholder="0x..." {...field} className="h-8"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tokens.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Price ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 3500.50" {...field} className="h-8"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tokens.${index}.volume`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">24h Vol ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 500M" {...field} className="h-8"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tokens.${index}.marketCap`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel className="text-xs">Market Cap ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 420B" {...field} className="h-8"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => remove(index)}
                      >
                          <Trash2 className="h-3 w-3" />
                      </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ address: "", price: 0, volume: 0, marketCap: 0 })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add
                </Button>
                <Button type="submit" disabled={isLoading} size="sm">
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
    </Card>
  );
}
