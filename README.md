# Learning MCP Server

A comprehensive, well-documented MCP (Model Context Protocol) server to help you understand how MCP works.

## What is MCP?

**MCP (Model Context Protocol)** is a protocol that allows AI models like Claude to interact with external tools, data, and services. Think of it as a way to extend Claude's capabilities beyond just text generation.

## The Three Pillars of MCP

MCP servers can provide three types of capabilities:

### 1. TOOLS (Actions)

Tools are functions that the AI can call to perform actions. They're like giving the AI hands to do things.

**Example Tools in this server:**
- `calculate` - Perform math operations (add, subtract, multiply, divide)
- `create_note` - Create a new note
- `update_note` - Modify an existing note
- `delete_note` - Remove a note
- `random_number` - Generate random numbers
- `transform_text` - Transform text (uppercase, lowercase, reverse, count words)

**How it works:**
```typescript
// 1. Declare the tool
{
  name: "calculate",
  description: "Performs basic arithmetic",
  inputSchema: {
    type: "object",
    properties: {
      operation: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
      a: { type: "number" },
      b: { type: "number" }
    }
  }
}

// 2. Implement the tool
case "calculate":
  const result = a + b; // (simplified)
  return { content: [{ type: "text", text: `Result: ${result}` }] };
```

### 2. RESOURCES (Data)

Resources are pieces of data that the AI can read. They're identified by URIs (like URLs).

**Example Resources in this server:**
- `note:///welcome` - Read a specific note by ID
- `note:///all` - Get a JSON list of all notes

**How it works:**
```typescript
// 1. List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [{
      uri: "note:///welcome",
      name: "Welcome Note",
      mimeType: "text/plain"
    }]
  };
});

// 2. Read a resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const note = notes.get(noteId);
  return {
    contents: [{
      uri: request.params.uri,
      mimeType: "text/plain",
      text: note.content
    }]
  };
});
```

### 3. PROMPTS (Templates)

Prompts are pre-defined templates that help users get started with common tasks.

**Example Prompts in this server:**
- `summarize_notes` - Get a summary of all notes
- `math_tutor` - Get help solving math problems
- `note_assistant` - Get help managing notes

**How it works:**
```typescript
// 1. Define the prompt
{
  name: "math_tutor",
  description: "Get help solving a math problem",
  arguments: [
    { name: "problem", description: "The math problem", required: true }
  ]
}

// 2. Generate the prompt
case "math_tutor":
  return {
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Help me solve: ${problem}\nUse the calculate tool.`
      }
    }]
  };
```

## Installation

```bash
# Install dependencies
npm install

# Build the server
npm run build
```

## Running the Server

### Option 1: Standalone (for testing)

```bash
npm start
```

The server will run and wait for MCP protocol messages on stdin/stdout.

### Option 2: With Claude Desktop

1. Build the server:
   ```bash
   npm run build
   ```

2. Add to Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):
   ```json
   {
     "mcpServers": {
       "learning-mcp": {
         "command": "node",
         "args": ["/absolute/path/to/claude-code-app/dist/index.js"]
       }
     }
   }
   ```

3. Restart Claude Desktop

4. Look for the MCP tools icon in the Claude interface

## Project Structure

```
.
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Node.js dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## How the Code is Organized

The `src/index.ts` file is organized into clear sections:

1. **Data Storage** - Simple in-memory storage for notes
2. **Server Setup** - Initialize the MCP server with capabilities
3. **Tools** - All tool definitions and implementations
4. **Resources** - Resource listing and reading logic
5. **Prompts** - Prompt definitions and generation
6. **Server Startup** - Connect to stdio transport and start

## Key Concepts Explained

### JSON Schema for Tool Parameters

Tools use JSON Schema to define their parameters:

```typescript
inputSchema: {
  type: "object",
  properties: {
    operation: {
      type: "string",
      enum: ["add", "subtract"],  // Only these values allowed
      description: "The operation to perform"
    },
    value: {
      type: "number",              // Must be a number
      description: "The value"
    }
  },
  required: ["operation", "value"]  // These parameters are mandatory
}
```

### URI Schemes for Resources

Resources use URI schemes to organize data:

- `note:///welcome` - A specific note
- `note:///all` - All notes
- You could add: `config:///settings`, `db:///users/123`, etc.

### Transport Layer

MCP uses a transport layer to communicate. This server uses `stdio` (standard input/output), which means it communicates through stdin/stdout. This is perfect for integration with Claude Desktop and other tools.

## Try These Examples

Once connected to Claude, try:

1. **Using Tools:**
   - "Calculate 15 + 27"
   - "Create a note called 'ideas' with my project ideas"
   - "Generate a random number between 1 and 100"
   - "Transform 'Hello World' to uppercase"

2. **Reading Resources:**
   - "Show me the welcome note"
   - "What notes do I have?"

3. **Using Prompts:**
   - "Use the math_tutor prompt to help me solve 123 × 456"
   - "Use the note_assistant prompt to help me create a todo list"

## Extending This Server

Want to add your own features? Here's how:

### Adding a New Tool

```typescript
// 1. Add to the tools list
{
  name: "my_new_tool",
  description: "What it does",
  inputSchema: {
    type: "object",
    properties: {
      param1: { type: "string", description: "First parameter" }
    },
    required: ["param1"]
  }
}

// 2. Add implementation in CallToolRequestSchema handler
case "my_new_tool":
  const { param1 } = args as { param1: string };
  // Do something with param1
  return {
    content: [{ type: "text", text: `Result: ${result}` }]
  };
```

### Adding a New Resource

```typescript
// 1. Add to ListResourcesRequestSchema handler
resources.push({
  uri: "mydata:///item",
  mimeType: "application/json",
  name: "My Data Item",
  description: "Description of the data"
});

// 2. Add to ReadResourceRequestSchema handler
if (uri.startsWith("mydata:///")) {
  const data = getMyData();
  return {
    contents: [{
      uri,
      mimeType: "application/json",
      text: JSON.stringify(data)
    }]
  };
}
```

## Learning Resources

- [MCP Official Docs](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

## Common Issues

**Server not showing in Claude Desktop:**
- Make sure the path in `claude_desktop_config.json` is absolute
- Run `npm run build` before starting Claude
- Check Claude logs: `~/Library/Logs/Claude/` (macOS)

**Tools not working:**
- Check that the `inputSchema` matches what Claude is sending
- Look at console errors (`console.error` output goes to Claude logs)

**Resources not found:**
- Verify URI schemes match exactly
- Check that resources are added in `ListResourcesRequestSchema`

## License

MIT

## Questions?

This is a learning project! Feel free to:
- Modify the code to experiment
- Add new tools, resources, or prompts
- Break things and see what happens
- Read through the well-commented code to understand each part

Happy learning!
