import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { authSchema } from "~/lib/validations/auth";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Icons } from "~/components/icons";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/password-input";
import { useMutation } from "@tanstack/react-query";
import { postData } from "~/lib/fetch";
import { useNavigate } from "@remix-run/react";
import { useToast } from "~/components/ui/use-toast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useSession } from "~/components/layout/session-provider";

type Inputs = z.infer<typeof authSchema>;

type CustomJwtPayload = JwtPayload & {
  payload: {
    user: string;
  };
};

const captains = console;

export function SignInForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateSession } = useSession();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      return postData("/api/auth", data);
    },
    onSuccess: (data) => {
      const decoded = jwtDecode(data.token) as CustomJwtPayload;
      updateSession({
        name: "John Doe", // dummy data
        email: decoded.payload.user,
        image: "https://avatars.githubusercontent.com/u/14899056?v=4", // dummy data
        token: data.token,
      });
      navigate("/");
      toast({
        description: "Sign in successful! 🎉",
      });
    },
  });

  async function onSubmit(data: Inputs) {
    captains.log("do something with the data", data);
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="rodneymullen180@gmail.com"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
