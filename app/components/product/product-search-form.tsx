import { Label } from "@radix-ui/react-label";
import { ProductSearchFormValues } from "~/types";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export function ProductSearchForm({
  searchParams,
}: {
  searchParams: ProductSearchFormValues;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product search</CardTitle>
        <CardDescription>
          Please enter the information of the product you want to search.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Please enter the name you want to search for"
              name="name"
              defaultValue={searchParams.name}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button className="w-full md:w-auto">Search</Button>
      </CardFooter>
    </Card>
  );
}
