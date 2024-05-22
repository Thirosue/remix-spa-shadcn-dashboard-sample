import React, { createContext, useCallback, useContext, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

type DialogOptions = {
  title: string;
  description: React.ReactNode;
  alert?: boolean;
};

const DEFAULT_OPTIONS: DialogOptions = {
  title: "",
  description: "",
  alert: false,
};

const ConfirmContext = createContext(
  {} as {
    confirm: (options: DialogOptions) => Promise<void>;
  },
);

const buildOptions = (options: DialogOptions): DialogOptions => {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
};

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [options, setOptions] = useState<DialogOptions>({ ...DEFAULT_OPTIONS });
  const [resolveReject, setResolveReject] = useState<
    [() => void, () => void] | []
  >([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options: DialogOptions): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setOptions(buildOptions(options));
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    reject?.();
    handleClose();
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    resolve?.();
    handleClose();
  }, [resolve, handleClose]);

  return (
    <>
      <AlertDialog open={resolveReject.length === 2}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {options.alert ? "Close" : "Cancel"}
            </AlertDialogCancel>
            {!options.alert && (
              <AlertDialogAction onClick={handleConfirm}>
                Continue
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ConfirmContext.Provider value={{ confirm }}>
        {children}
      </ConfirmContext.Provider>
    </>
  );
};

export const useConfirm = (): ((options: DialogOptions) => Promise<void>) => {
  const { confirm } = useContext(ConfirmContext);
  return confirm;
};
