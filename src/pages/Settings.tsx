import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/user-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "@/schemas/user-schema";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Settings() {
  const [saved, setSaved] = useState<boolean>(false)
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
  });
  function onSubmit(data: ProfileFormValues) {
    updateUser(data);
    setSaved(true);
  }
  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl mb-1">Your data</h1>
        <Separator />
        <div className="flex flex-col p-2">
          <p>Name: {user.name}</p>
          <p>Avatar: {user.avatarUrl}</p>
        </div>
      </div>
      <div className="my-4">
        <Separator />
      </div>
      <div>
        <h1 className="text-xl mb-2">Change user Data</h1>
        <Separator />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-3 border-2 rounded-2xl p-4"
        >
          <Field>
            <FieldLabel>Username</FieldLabel>

            <Input
              type="text"
              {...form.register("name", { onChange: () => setSaved(false) })}
            />

            <FieldDescription>
              This name will be displayed across LinkVault.
            </FieldDescription>

            {form.formState.errors.name && (
              <FieldError>{form.formState.errors.name.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Avatar URL</FieldLabel>

            <Input
              type="url"
              {...form.register("avatarUrl", {
                onChange: () => setSaved(false),
              })}
            />

            <FieldDescription>
              Enter the URL of your profile picture.
            </FieldDescription>

            {form.formState.errors.avatarUrl && (
              <FieldError>{form.formState.errors.avatarUrl.message}</FieldError>
            )}
          </Field>
          <div className="flex gap-4 items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Save</Button>
          </div>
          {form.formState.isSubmitSuccessful && saved && (
            <p className="text-sm text-green-600">Changes Saved!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Settings;
