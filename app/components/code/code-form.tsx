import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Heading } from "~/components/ui/heading";
import { useState } from "react";
import { toast } from "~/components/ui/use-toast";
import { AlertModal } from "~/components/modal/alert-modal";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@remix-run/react";
import { codeUpsertSchema } from "~/lib/validations/code";
import { Code, CodeCategory } from "~/types";

type CodeFormValues = z.infer<typeof codeUpsertSchema>;

interface CodeFormProps {
  initialData: Code | null;
  csrfToken: string;
  categories: CodeCategory[];
}

export function CodeForm({
  initialData,
  csrfToken,
  categories,
}: CodeFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const title = initialData ? "Edit code" : "Create code";
  const description = initialData ? "Edit a code" : "Add a new code";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CodeFormValues>({
    resolver: zodResolver(codeUpsertSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          codeAlias: initialData.codeAlias || "",
          token: csrfToken,
        }
      : {
          categoryCode: "",
          codeValue: "",
          codeName: "",
          codeAlias: "",
          displayOrder: 0,
          token: csrfToken,
        },
  });

  // Form submission handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: CodeFormValues) => {
    // Note: _data variable is intentionally prefixed with underscore as it's required by the form
    // but not used in this demo implementation
    try {
      setLoading(true);

      // API call would go here

      toast({
        title: "Code saved.",
      });
      navigate("/dashboard/codes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      // Delete API call would go here

      toast({
        title: "Code deleted.",
      });
      navigate("/dashboard/codes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <FormField
              control={form.control}
              name="categoryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Code</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={loading}
                      {...field}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option
                          key={category.categoryCode}
                          value={category.categoryCode}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter code value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter code name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeAlias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Alias</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter code alias (optional)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Enter display order"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <input type="hidden" name="token" value={csrfToken} />
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
