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
      tokens: mockTokens.slice(0, 2).map(t => ({ address: t.address, price: t.price, volume: t.volume, marketCap: t.marketCap })),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-lg relative bg-background">
                <FormField
                  control={form.control}
                  name={`tokens.${index}.address`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Token Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
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
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 3500.50" {...field} />
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
                      <FormLabel>24h Volume ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tokens.${index}.marketCap`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Cap ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 420000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => remove(index)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ address: "", price: 0, volume: 0, marketCap: 0 })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Token
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Batch Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
