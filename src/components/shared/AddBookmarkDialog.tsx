import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { useUIStore } from "@/stores/ui-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addBookmarkSchema,
  type AddBookmarkFormValues,
} from "@/schemas/addbookmark-schema";
import { Textarea } from "@/components/ui/textarea";
import { useBookmarkStore } from "@/stores/bookmark-store";

function AddBookmarkDialog() {
  const isOpen = useUIStore((state) => state.isAddBookmarkOpen);
  const close = useUIStore((state) => state.closeAddBookmark);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);

  const form = useForm<AddBookmarkFormValues>({
    resolver: zodResolver(addBookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      tags: [],
    },
  });
  function onSubmit(data: AddBookmarkFormValues) {
    addBookmark({
      id: crypto.randomUUID(),
      ...data,
      favorite: false,
      createdAt: new Date().toISOString(),
    });

    form.reset();
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>
            Save a new resource to your vault.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field>
            <FieldLabel>Title</FieldLabel>

            <Input
              placeholder="React Documentation"
              {...form.register("title")}
            />

            <FieldDescription>
              Give your bookmark a recognizable name.
            </FieldDescription>

            {form.formState.errors.title && (
              <FieldError>{form.formState.errors.title.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>URL</FieldLabel>

            <Input
              type="url"
              placeholder="https://react.dev"
              {...form.register("url")}
            />

            {form.formState.errors.url && (
              <FieldError>{form.formState.errors.url.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>

            <Textarea
              placeholder="Official React documentation..."
              {...form.register("description")}
            />

            <FieldDescription>
              An optional description for this resource.
            </FieldDescription>

            {form.formState.errors.description && (
              <FieldError>
                {form.formState.errors.description.message}
              </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Tags</FieldLabel>

            <Input
              placeholder="react, javascript, frontend"
              onChange={(e) => {
                const tags = e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean);

                form.setValue("tags", tags);
              }}
            />

            <FieldDescription>Separate tags with commas.</FieldDescription>
          </Field>
          <Button type="submit" className="w-full sm:w-auto">Add Bookmark</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBookmarkDialog;
