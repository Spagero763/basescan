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
import { protocols as mockProtocols } from "@/lib/mock-data";

const protocolSchema = z.object({
  name: z.string().min(1, "Protocol name is required."),
  tvl: z.coerce.number().min(0, "TVL must be a positive number."),
  volume24h: z.coerce.number().min(0, "Volume must be a positive number."),
  users: z.coerce.number().min(0, "Users must be a positive number."),
});

const formSchema = z.object({
  protocols: z.array(protocolSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateMetrics() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      protocols: mockProtocols.slice(0, 2).map(p => ({...p})), // Start with first 2 mock protocols
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "protocols",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    console.log("Submitting:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast({
      title: "Success!",
      description: "Protocol metrics have been updated.",
    });
    // Here you would typically call a server action to interact with the blockchain
    // For now, we just log the data and show a toast.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-lg relative bg-background">
                <FormField
                  control={form.control}
                  name={`protocols.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Protocol</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., AeroSwap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`protocols.${index}.tvl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TVL ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 850000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`protocols.${index}.volume24h`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>24h Volume ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 120000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`protocols.${index}.users`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Active Users</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 45000" {...field} />
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
            onClick={() => append({ name: "", tvl: 0, volume24h: 0, users: 0 })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Protocol
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Batch Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
