"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { UserPlus, UserX } from "lucide-react";

const authorizeSchema = z.object({
  address: z.string().startsWith("0x", "Address must start with 0x.").length(42, "Address must be 42 characters long."),
});

type AuthorizeFormValues = z.infer<typeof authorizeSchema>;

export default function AdminActions() {
  const { toast } = useToast();
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  
  // Mock list of authorized updaters
  const [updaters, setUpdaters] = useState([
    "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  ]);

  const form = useForm<AuthorizeFormValues>({
    resolver: zodResolver(authorizeSchema),
    defaultValues: { address: "" },
  });

  const onAuthorizeSubmit: SubmitHandler<AuthorizeFormValues> = async (data) => {
    setIsAuthorizing(true);
    console.log("Authorizing updater:", data.address);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUpdaters(prev => [...prev, data.address]);
    setIsAuthorizing(false);
    toast({
      title: "Success!",
      description: `Updater ${data.address.substring(0,6)}... authorized.`,
    });
    form.reset();
  };

  const handleRemoveUpdater = async (address: string) => {
    // In a real app, you'd want a confirmation dialog here
    setIsRemoving(true);
    console.log("Removing updater:", address);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUpdaters(prev => prev.filter(u => u !== address));
    setIsRemoving(false);
    toast({
      title: "Success!",
      description: `Updater ${address.substring(0,6)}... removed.`,
      variant: "destructive"
    });
  }

  return (
    <div className="space-y-4">
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-base font-headline">Authorize Updater</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAuthorizeSubmit)} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="sr-only">Updater Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} className="h-9"/>
                    </FormControl>
                    <FormMessage className="mt-1"/>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isAuthorizing} size="sm">
                {isAuthorizing ? "..." : "Auth"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="p-0 mb-2">
            <CardTitle className="text-base font-headline">Manage Updaters</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <div className="space-y-2">
                {updaters.map(updater => (
                    <div key={updater} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <p className="font-mono text-xs text-muted-foreground">{updater.substring(0,12)}...</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemoveUpdater(updater)}
                            disabled={isRemoving}
                        >
                           <UserX className="h-4 w-4"/>
                        </Button>
                    </div>
                ))}
                {updaters.length === 0 && (
                    <p className="text-sm text-center text-muted-foreground py-4">No authorized updaters.</p>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
