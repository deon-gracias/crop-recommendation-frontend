import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ApiKeyModal({ opened, onClose, title }) {
  const form = useForm({
    initialValues: {
      apiKey: "",
    },

    validate: {
      apiKey: (value) => (value ? null : "Invalid API Key"),
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          placeholder="Your Api Key"
          {...form.getInputProps("apiKey")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
