import { Stack, Field, Input, HStack } from "@chakra-ui/react";

export function CheckoutForm({ buyer, setBuyer }) {
  const handleChange = (e) =>
    setBuyer({ ...buyer, [e.target.name]: e.target.value });

  return (
    <Stack gap="4" align="stretch">
      <Field.Root>
        <Field.Label>Nombre completo</Field.Label>
        <Input
          name="name"
          value={buyer.name}
          onChange={handleChange}
          placeholder="Name / Last name"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Teléfono</Field.Label>
        <Input
          name="phone"
          value={buyer.phone}
          onChange={handleChange}
          placeholder="Contact"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Correo (opcional)</Field.Label>
        <Input
          name="email"
          value={buyer.email}
          onChange={handleChange}
          placeholder="email@dominio.com"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Dirección</Field.Label>
        <Input
          name="street"
          value={buyer.street}
          onChange={handleChange}
          placeholder="Street number"
        />
      </Field.Root>

      <HStack>
        <Field.Root>
          <Field.Label>Entre calles</Field.Label>
          <Input
            name="betweenStreets"
            value={buyer.betweenStreets}
            onChange={handleChange}
            placeholder="Between streets"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Depto</Field.Label>
          <Input
            name="department"
            value={buyer.department}
            onChange={handleChange}
            placeholder="Dept / Floor"
          />
        </Field.Root>
      </HStack>

      <HStack>
        <Field.Root>
          <Field.Label>Localidad</Field.Label>
          <Input
            name="city"
            value={buyer.city}
            onChange={handleChange}
            placeholder="City"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Provincia</Field.Label>
          <Input
            name="province"
            value={buyer.province}
            onChange={handleChange}
            placeholder="Province"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>CP</Field.Label>
          <Input
            name="zip"
            value={buyer.zip}
            onChange={handleChange}
            placeholder="Postal Code"
          />
        </Field.Root>
      </HStack>
    </Stack>
  );
}