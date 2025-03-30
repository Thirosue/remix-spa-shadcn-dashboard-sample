import { useEffect, useTransition } from "react";
import { useIsSubmitting } from "~/hooks/use-mounted";
import { CodeSearchFormValues } from "~/types";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export function CodeSearchForm({
  searchParams,
}: {
  searchParams: CodeSearchFormValues;
}) {
  const [isPending, startTransition] = useTransition();
  const { isSubmitting, setIsSubmitting } = useIsSubmitting();

  useEffect(() => {
    if (!isPending) {
      setIsSubmitting(false);
    }
  }, [isPending, setIsSubmitting]);

  return (
    <div className="grid gap-2 py-4 sm:grid-cols-4">
      <div className="grid gap-1">
        <Input
          placeholder="Category Code"
          name="categoryCode"
          defaultValue={searchParams.categoryCode}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        disabled={isSubmitting}
        onClick={() => {
          startTransition(() => {
            setIsSubmitting(true);
          });
        }}
      >
        {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Search
      </Button>
    </div>
  );
}
