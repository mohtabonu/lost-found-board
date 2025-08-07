import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "password is required"),
});

type FormData = z.infer<typeof formSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { methods,isLoading } = useContext(AuthContext);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    methods.login(data.email, data.password);
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Log In </CardTitle>
            <CardDescription>
              Don't have an account?{" "}
              <span
                className="text-black underline font-semibold cursor-pointer"
                onClick={() => navigate("/auth/register")}
              >
                Signup now{" "}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
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
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit'}</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
