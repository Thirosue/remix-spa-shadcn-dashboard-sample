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
import { codeCategoryUpsertSchema } from "~/lib/validations/code";
import { CodeCategory } from "~/types";

type CodeCategoryFormValues = z.infer<typeof codeCategoryUpsertSchema>;

interface CodeCategoryFormProps {
  initialData: CodeCategory | null;
  csrfToken: string;
}

export function CodeCategoryForm({
  initialData,
  csrfToken,
}: CodeCategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const title = initialData ? "Edit code category" : "Create code category";
  const description = initialData
    ? "Edit a code category"
    : "Add a new code category";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CodeCategoryFormValues>({
    resolver: zodResolver(codeCategoryUpsertSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          description: initialData.description || "",
          token: csrfToken,
        }
      : {
          categoryCode: "",
          categoryName: "",
          description: "",
          token: csrfToken,
        },
  });

  // Form submission handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: CodeCategoryFormValues) => {
    // Note: _data variable is intentionally prefixed with underscore as it's required by the form
    // but not used in this demo implementation
    try {
      setLoading(true);

      // API call would go here

      toast({
        title: "Code category saved.",
      });
      navigate("/dashboard/code-categories");
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
        title: "Code category deleted.",
      });
      navigate("/dashboard/code-categories");
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
                    <Input
                      disabled={loading || !!initialData}
                      placeholder="Enter category code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter description (optional)"
                      {...field}
                      value={field.value || ""}
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
