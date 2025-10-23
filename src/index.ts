#!/usr/bin/env node

/**
 * Learning MCP Server
 *
 * This is a comprehensive MCP (Model Context Protocol) server that demonstrates
 * all three main components of MCP:
 * 1. TOOLS - Functions that can be called by the AI
 * 2. RESOURCES - Data that can be read by the AI
 * 3. PROMPTS - Pre-defined prompt templates for the AI
 *
 * Run this server and connect it to Claude Desktop or other MCP clients to see it in action!
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============================================================================
// DATA STORAGE
// ============================================================================

// Simple in-memory storage for demonstration
const notes: Map<string, { content: string; createdAt: Date; updatedAt: Date }> = new Map();

// Initialize with a sample note
notes.set("welcome", {
  content: "Welcome to the Learning MCP Server! This is an example note.",
  createdAt: new Date(),
  updatedAt: new Date(),
});

// ============================================================================
// SERVER SETUP
// ============================================================================

const server = new Server(
  {
    name: "learning-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},      // This server provides tools
      resources: {},  // This server provides resources
      prompts: {},    // This server provides prompts
    },
  }
);

// ============================================================================
// TOOLS - Functions the AI can call
// ============================================================================

/**
 * Tools are actions that the AI can perform. They're like function calls.
 * Each tool has:
 * - name: unique identifier
 * - description: what it does
 * - inputSchema: JSON Schema defining the parameters
 */

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // CALCULATOR TOOL
      {
        name: "calculate",
        description: "Performs basic arithmetic operations (add, subtract, multiply, divide)",
        inputSchema: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              enum: ["add", "subtract", "multiply", "divide"],
              description: "The arithmetic operation to perform",
            },
            a: {
              type: "number",
              description: "First number",
            },
            b: {
              type: "number",
              description: "Second number",
            },
          },
          required: ["operation", "a", "b"],
        },
      },

      // CREATE NOTE TOOL
      {
        name: "create_note",
        description: "Creates a new note with a given ID and content",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the note",
            },
            content: {
              type: "string",
              description: "The content of the note",
            },
          },
          required: ["id", "content"],
        },
      },

      // UPDATE NOTE TOOL
      {
        name: "update_note",
        description: "Updates an existing note's content",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID of the note to update",
            },
            content: {
              type: "string",
              description: "New content for the note",
            },
          },
          required: ["id", "content"],
        },
      },

      // DELETE NOTE TOOL
      {
        name: "delete_note",
        description: "Deletes a note by its ID",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID of the note to delete",
            },
          },
          required: ["id"],
        },
      },

      // RANDOM NUMBER TOOL
      {
        name: "random_number",
        description: "Generates a random number between min and max (inclusive)",
        inputSchema: {
          type: "object",
          properties: {
            min: {
              type: "number",
              description: "Minimum value (default: 0)",
            },
            max: {
              type: "number",
              description: "Maximum value (default: 100)",
            },
          },
        },
      },

      // TEXT TRANSFORM TOOL
      {
        name: "transform_text",
        description: "Transforms text using various operations (uppercase, lowercase, reverse, word_count)",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to transform",
            },
            operation: {
              type: "string",
              enum: ["uppercase", "lowercase", "reverse", "word_count"],
              description: "The transformation to apply",
            },
          },
          required: ["text", "operation"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // CALCULATOR IMPLEMENTATION
      case "calculate": {
        const { operation, a, b } = args as { operation: string; a: number; b: number };
        let result: number;

        switch (operation) {
          case "add":
            result = a + b;
            break;
          case "subtract":
            result = a - b;
            break;
          case "multiply":
            result = a * b;
            break;
          case "divide":
            if (b === 0) {
              throw new Error("Cannot divide by zero");
            }
            result = a / b;
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }

        return {
          content: [
            {
              type: "text",
              text: `Result: ${a} ${operation} ${b} = ${result}`,
            },
          ],
        };
      }

      // CREATE NOTE IMPLEMENTATION
      case "create_note": {
        const { id, content } = args as { id: string; content: string };

        if (notes.has(id)) {
          throw new Error(`Note with ID "${id}" already exists`);
        }

        notes.set(id, {
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return {
          content: [
            {
              type: "text",
              text: `Note "${id}" created successfully`,
            },
          ],
        };
      }

      // UPDATE NOTE IMPLEMENTATION
      case "update_note": {
        const { id, content } = args as { id: string; content: string };

        const note = notes.get(id);
        if (!note) {
          throw new Error(`Note with ID "${id}" not found`);
        }

        notes.set(id, {
          content,
          createdAt: note.createdAt,
          updatedAt: new Date(),
        });

        return {
          content: [
            {
              type: "text",
              text: `Note "${id}" updated successfully`,
            },
          ],
        };
      }

      // DELETE NOTE IMPLEMENTATION
      case "delete_note": {
        const { id } = args as { id: string };

        if (!notes.has(id)) {
          throw new Error(`Note with ID "${id}" not found`);
        }

        notes.delete(id);

        return {
          content: [
            {
              type: "text",
              text: `Note "${id}" deleted successfully`,
            },
          ],
        };
      }

      // RANDOM NUMBER IMPLEMENTATION
      case "random_number": {
        const { min = 0, max = 100 } = args as { min?: number; max?: number };
        const random = Math.floor(Math.random() * (max - min + 1)) + min;

        return {
          content: [
            {
              type: "text",
              text: `Random number between ${min} and ${max}: ${random}`,
            },
          ],
        };
      }

      // TEXT TRANSFORM IMPLEMENTATION
      case "transform_text": {
        const { text, operation } = args as { text: string; operation: string };
        let result: string | number;

        switch (operation) {
          case "uppercase":
            result = text.toUpperCase();
            break;
          case "lowercase":
            result = text.toLowerCase();
            break;
          case "reverse":
            result = text.split("").reverse().join("");
            break;
          case "word_count":
            result = text.split(/\s+/).filter(word => word.length > 0).length;
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }

        return {
          content: [
            {
              type: "text",
              text: `Result: ${result}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// RESOURCES - Data the AI can read
// ============================================================================

/**
 * Resources are pieces of data that the AI can read.
 * They're identified by URIs (like "note://welcome")
 * Use cases: configuration files, documentation, database records, etc.
 */

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources = [];

  // Add all notes as resources
  for (const [id, note] of notes.entries()) {
    resources.push({
      uri: `note:///${id}`,
      mimeType: "text/plain",
      name: `Note: ${id}`,
      description: `A note with ID "${id}" (created: ${note.createdAt.toISOString()})`,
    });
  }

  // Add a special "all notes" resource
  resources.push({
    uri: "note:///all",
    mimeType: "application/json",
    name: "All Notes",
    description: "A JSON list of all available notes with metadata",
  });

  return { resources };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (!uri.startsWith("note:///")) {
    throw new Error(`Unsupported URI scheme: ${uri}`);
  }

  const noteId = uri.replace("note:///", "");

  // Special case: return all notes
  if (noteId === "all") {
    const allNotes = Array.from(notes.entries()).map(([id, note]) => ({
      id,
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }));

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(allNotes, null, 2),
        },
      ],
    };
  }

  // Get specific note
  const note = notes.get(noteId);
  if (!note) {
    throw new Error(`Note not found: ${noteId}`);
  }

  return {
    contents: [
      {
        uri,
        mimeType: "text/plain",
        text: note.content,
      },
    ],
  };
});

// ============================================================================
// PROMPTS - Pre-defined prompt templates
// ============================================================================

/**
 * Prompts are pre-defined templates that help users interact with the AI.
 * They can include context from resources and accept arguments.
 */

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "summarize_notes",
        description: "Creates a summary of all notes in the system",
        arguments: [],
      },
      {
        name: "math_tutor",
        description: "Get help solving a math problem using the calculator",
        arguments: [
          {
            name: "problem",
            description: "The math problem to solve",
            required: true,
          },
        ],
      },
      {
        name: "note_assistant",
        description: "Get help managing your notes",
        arguments: [
          {
            name: "task",
            description: "What you want to do with notes (e.g., 'create a todo list', 'organize ideas')",
            required: true,
          },
        ],
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "summarize_notes": {
      // Get all notes
      const allNotes = Array.from(notes.entries())
        .map(([id, note]) => `- ${id}: ${note.content}`)
        .join("\n");

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please summarize these notes:\n\n${allNotes}\n\nProvide a concise overview of the main topics and ideas.`,
            },
          },
        ],
      };
    }

    case "math_tutor": {
      const problem = args?.problem as string;

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I need help solving this math problem: ${problem}\n\nPlease break down the solution step by step. You can use the "calculate" tool to perform arithmetic operations.`,
            },
          },
        ],
      };
    }

    case "note_assistant": {
      const task = args?.task as string;

      // Get current notes
      const notesList = Array.from(notes.keys()).join(", ");

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I need help with my notes. Current notes: ${notesList || "none"}\n\nTask: ${task}\n\nYou can use create_note, update_note, and delete_note tools to help me manage my notes.`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

// ============================================================================
// START THE SERVER
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Learning MCP Server running on stdio");
  console.error("This server demonstrates:");
  console.error("  - TOOLS: calculate, create_note, update_note, delete_note, random_number, transform_text");
  console.error("  - RESOURCES: note:/// URIs for reading stored notes");
  console.error("  - PROMPTS: summarize_notes, math_tutor, note_assistant");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
