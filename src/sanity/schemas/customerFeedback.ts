import { defineType, defineField } from "sanity";

// Submitted by customers through the website form. Only approved entries are shown on the site.
export default defineType({
  name: "customerFeedback",
  title: "Customer Feedback",
  type: "document",
  fields: [
    defineField({
      name: "approved",
      title: "Approved (show on website)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Private — never shown on the website.",
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "message",
      title: "Feedback",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { name: "name", rating: "rating", approved: "approved", message: "message" },
    prepare({ name, rating, approved, message }) {
      return {
        title: `${approved ? "✅" : "⏳"} ${name} — ${"★".repeat(rating || 0)}`,
        subtitle: message,
      };
    },
  },
});
