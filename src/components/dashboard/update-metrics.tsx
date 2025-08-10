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
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
      protocols: mockProtocols.slice(0, 1).map(p => ({...p})),
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
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
       <CardHeader className="p-0 mb-2">
          <CardTitle className="text-base font-headline">Update Protocol Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-2 gap-2 items-end p-2 border rounded-lg relative bg-background">
                        <FormField
                          control={form.control}
                          name={`protocols.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel className="text-xs">Protocol</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., AeroSwap" {...field} className="h-8"/>
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
                              <FormLabel className="text-xs">TVL ($)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 850000000" {...field} className="h-8"/>
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
                              <FormLabel className="text-xs">24h Volume ($)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 120000000" {...field} className="h-8"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name={`protocols.${index}.users`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel className="text-xs">Active Users</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 45000" {...field} className="h-8"/>
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
                    size="sm"
                    variant="outline"
                    onClick={() => append({ name: "", tvl: 0, volume24h: 0, users: 0 })}
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
