# Perplexity API Documentation

## Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Available Models](#available-models)
- [Authentication](#authentication)
- [Client Configuration](#client-configuration)
- [Basic Usage](#basic-usage)
- [Web Search & Grounded Responses](#web-search--grounded-responses)
- [Advanced Features](#advanced-features)
- [Response Structure](#response-structure)
- [Streaming Responses](#streaming-responses)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Examples](#examples)

---

## Overview

Perplexity AI provides state-of-the-art language models with **built-in web search capabilities**, making them ideal for:
- Real-time information retrieval
- Grounded, factual responses with citations
- Research and knowledge discovery
- Up-to-date information (not limited to training data cutoff)

The API is compatible with the OpenAI SDK, making it easy to integrate into existing projects.

---

## Quick Start

### Installation

```bash
pip install openai python-dotenv
```

### Environment Setup

Create a `.env` file in your project root:

```env
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Get your API key from: https://www.perplexity.ai/settings/api

### Basic Example

```python
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("PERPLEXITY_API_KEY"),
    base_url="https://api.perplexity.ai"
)

response = client.chat.completions.create(
    model="sonar",
    messages=[
        {"role": "user", "content": "What are the latest developments in AI?"}
    ]
)

print(response.choices[0].message.content)
```

---

## Available Models

Perplexity offers several models optimized for different use cases:

### 1. **sonar** (Fast Online Model)
- **Best for:** Quick queries, real-time information
- **Features:** Fast responses with web search
- **Context Window:** 127,072 tokens
- **Use cases:** Chatbots, quick lookups, real-time data

### 2. **sonar-pro** (Advanced Online Model)
- **Best for:** Complex queries requiring deeper reasoning
- **Features:** Enhanced reasoning + comprehensive web search
- **Context Window:** 127,072 tokens
- **Use cases:** Research, detailed analysis, complex questions

### 3. **sonar-reasoning** (Reasoning-Focused Model)
- **Best for:** Logic puzzles, multi-step reasoning, analysis
- **Features:** Advanced reasoning with web search integration
- **Context Window:** 127,072 tokens
- **Use cases:** Problem-solving, analytical tasks, research

### Model Selection Guide

```python
# Quick information lookup
model = "sonar"

# Detailed research or complex queries
model = "sonar-pro"

# Reasoning-heavy tasks
model = "sonar-reasoning"
```

---

## Authentication

### API Key Setup

1. Sign up at https://www.perplexity.ai
2. Navigate to Settings → API
3. Generate an API key
4. Store securely in environment variables

### Security Best Practices

```python
# ✅ Good: Use environment variables
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("PERPLEXITY_API_KEY")

# ❌ Bad: Hardcode API keys
api_key = "pplx-1234567890"  # Never do this!
```

---

## Client Configuration

### Basic Configuration

```python
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("PERPLEXITY_API_KEY"),
    base_url="https://api.perplexity.ai"
)
```

### Advanced Configuration

```python
client = OpenAI(
    api_key=os.getenv("PERPLEXITY_API_KEY"),
    base_url="https://api.perplexity.ai",
    timeout=60,  # Request timeout in seconds
    max_retries=3,  # Retry failed requests
    default_headers={
        "X-Custom-Header": "value"
    }
)
```

### Configuration Options

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | str | Yes | Your Perplexity API key |
| `base_url` | str | Yes | API endpoint (https://api.perplexity.ai) |
| `timeout` | int/float | No | Request timeout in seconds (default: varies) |
| `max_retries` | int | No | Number of retry attempts (default: 2) |
| `default_headers` | dict | No | Custom headers for all requests |
| `organization` | str | No | Organization ID for multi-org accounts |

---

## Basic Usage

### Simple Query

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[
        {"role": "user", "content": "What is quantum computing?"}
    ]
)

print(response.choices[0].message.content)
```

### Conversation with Context

```python
messages = [
    {"role": "system", "content": "You are a helpful AI assistant specializing in technology."},
    {"role": "user", "content": "What is quantum computing?"},
    {"role": "assistant", "content": "Quantum computing is a type of computation that..."},
    {"role": "user", "content": "How is it different from classical computing?"}
]

response = client.chat.completions.create(
    model="sonar-pro",
    messages=messages
)
```

### Message Roles

- **system**: Sets the behavior and context for the assistant
- **user**: User's input or question
- **assistant**: Previous responses from the model (for conversation history)

---

## Web Search & Grounded Responses

Perplexity models have **built-in web search** that automatically retrieves relevant information to answer queries.

### Enable Citations

```python
response = client.chat.completions.create(
    model="sonar-pro",
    messages=[
        {"role": "user", "content": "What are the latest breakthroughs in cancer research?"}
    ],
    return_citations=True  # Get source URLs
)

# Access citations
for citation in response.choices[0].message.citations:
    print(f"Source: {citation}")
```

### Include Images

```python
response = client.chat.completions.create(
    model="sonar-pro",
    messages=[
        {"role": "user", "content": "Show me the latest Mars rover images"}
    ],
    return_images=True  # Include relevant images
)

# Access images
if hasattr(response.choices[0].message, 'images'):
    for image in response.choices[0].message.images:
        print(f"Image URL: {image}")
```

### Domain Filtering

Limit search results to specific domains:

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[
        {"role": "user", "content": "Latest Python updates"}
    ],
    search_domain_filter=["python.org", "github.com", "stackoverflow.com"]
)
```

### Recency Filtering

Get only recent information:

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[
        {"role": "user", "content": "Recent AI news"}
    ],
    search_recency_filter="week"  # Options: "hour", "day", "week", "month", "year"
)
```

### Web Search Options Summary

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `return_citations` | bool | Include source URLs in response | `return_citations=True` |
| `return_images` | bool | Include relevant images | `return_images=True` |
| `search_domain_filter` | list[str] | Limit to specific domains | `["wikipedia.org"]` |
| `search_recency_filter` | str | Filter by time period | `"month"` |

---

## Advanced Features

### Temperature Control

Control response randomness:

```python
# Focused, deterministic responses
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Define machine learning"}],
    temperature=0.2  # Range: 0.0 - 2.0
)

# Creative, varied responses
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Write a creative story"}],
    temperature=1.5
)
```

### Token Limits

Control response length:

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Explain blockchain"}],
    max_tokens=200  # Limit response to ~200 tokens
)
```

### Multiple Completions

Generate multiple response alternatives:

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "What is AI?"}],
    n=3  # Generate 3 different responses
)

for i, choice in enumerate(response.choices):
    print(f"\nResponse {i+1}:")
    print(choice.message.content)
```

### Stop Sequences

Define custom stop conditions:

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "List 5 programming languages"}],
    stop=["\n\n", "6."]  # Stop at double newline or "6."
)
```

### Penalty Parameters

Reduce repetition and encourage diversity:

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Write about AI"}],
    frequency_penalty=0.5,  # Reduce repetition (-2.0 to 2.0)
    presence_penalty=0.3    # Encourage new topics (-2.0 to 2.0)
)
```

### Complete Parameter Reference

```python
response = client.chat.completions.create(
    # Required parameters
    model="sonar-pro",
    messages=[...],
    
    # Sampling parameters
    temperature=0.7,           # Randomness (0.0 - 2.0)
    top_p=0.9,                # Nucleus sampling (0.0 - 1.0)
    max_tokens=1000,          # Max tokens to generate
    
    # Output control
    n=1,                      # Number of completions
    stop=["\n\n", "END"],     # Stop sequences
    
    # Repetition control
    frequency_penalty=0.0,    # Reduce repetition
    presence_penalty=0.0,     # Encourage new topics
    
    # Web search (Perplexity-specific)
    return_citations=True,    # Include sources
    return_images=False,      # Include images
    search_domain_filter=[],  # Domain whitelist
    search_recency_filter="", # Time filter
    
    # Streaming
    stream=False,             # Enable streaming
)
```

---

## Response Structure

### Standard Response Object

```python
{
    "id": "chatcmpl-abc123",
    "object": "chat.completion",
    "created": 1699000000,
    "model": "sonar-pro",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Response text here...",
                "citations": ["https://example.com/source1", ...]  # If return_citations=True
            },
            "finish_reason": "stop"  # "stop", "length", or "content_filter"
        }
    ],
    "usage": {
        "prompt_tokens": 20,
        "completion_tokens": 150,
        "total_tokens": 170
    }
}
```

### Accessing Response Data

```python
response = client.chat.completions.create(...)

# Get the main response text
content = response.choices[0].message.content

# Check why generation stopped
finish_reason = response.choices[0].finish_reason

# Get token usage
tokens_used = response.usage.total_tokens
prompt_tokens = response.usage.prompt_tokens
completion_tokens = response.usage.completion_tokens

# Access citations (if enabled)
if hasattr(response.choices[0].message, 'citations'):
    citations = response.choices[0].message.citations
```

### Finish Reasons

- **stop**: Natural completion
- **length**: Reached max_tokens limit
- **content_filter**: Filtered due to content policy

---

## Streaming Responses

Stream responses token-by-token for real-time output:

### Basic Streaming

```python
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Explain quantum computing"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### Streaming with Citations

```python
response = client.chat.completions.create(
    model="sonar-pro",
    messages=[{"role": "user", "content": "Latest AI research"}],
    stream=True,
    return_citations=True
)

full_response = ""
citations = []

for chunk in response:
    delta = chunk.choices[0].delta
    
    # Accumulate content
    if delta.content is not None:
        full_response += delta.content
        print(delta.content, end="", flush=True)
    
    # Collect citations
    if hasattr(delta, 'citations') and delta.citations:
        citations.extend(delta.citations)

print("\n\nSources:")
for citation in citations:
    print(f"- {citation}")
```

### Streaming Error Handling

```python
try:
    response = client.chat.completions.create(
        model="sonar",
        messages=[{"role": "user", "content": "Hello"}],
        stream=True
    )
    
    for chunk in response:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="")
            
except Exception as e:
    print(f"Streaming error: {e}")
```

---

## Best Practices

### 1. Use System Messages Effectively

```python
# Good: Clear system prompt
messages = [
    {
        "role": "system",
        "content": "You are an expert data scientist. Provide accurate, "
                   "technical explanations with examples."
    },
    {"role": "user", "content": "Explain gradient descent"}
]
```

### 2. Choose the Right Model

```python
# Quick facts → use "sonar"
if query_type == "quick_fact":
    model = "sonar"

# Deep research → use "sonar-pro"
elif query_type == "research":
    model = "sonar-pro"

# Complex reasoning → use "sonar-reasoning"
elif query_type == "reasoning":
    model = "sonar-reasoning"
```

### 3. Enable Citations for Factual Queries

```python
# Always enable citations for factual information
response = client.chat.completions.create(
    model="sonar-pro",
    messages=[{"role": "user", "content": "Latest COVID-19 statistics"}],
    return_citations=True,  # Get sources
    search_recency_filter="day"  # Recent data only
)
```

### 4. Optimize Token Usage

```python
# Set max_tokens to avoid excessive usage
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Brief summary of AI"}],
    max_tokens=200,  # Concise response
    temperature=0.2  # Focused output
)
```

### 5. Handle Errors Gracefully

```python
from openai import OpenAI, APIError, RateLimitError, Timeout

try:
    response = client.chat.completions.create(...)
except RateLimitError:
    print("Rate limit exceeded. Wait before retrying.")
except Timeout:
    print("Request timed out. Try again.")
except APIError as e:
    print(f"API error: {e}")
```

### 6. Use Streaming for Long Responses

```python
# For long-form content, use streaming
response = client.chat.completions.create(
    model="sonar-pro",
    messages=[{"role": "user", "content": "Write a detailed guide on..."}],
    stream=True,
    max_tokens=2000
)
```

---

## Error Handling

### Common Error Types

```python
from openai import (
    OpenAI,
    APIError,
    RateLimitError,
    APIConnectionError,
    Timeout,
    AuthenticationError
)

try:
    response = client.chat.completions.create(
        model="sonar",
        messages=[{"role": "user", "content": "Hello"}]
    )
    
except AuthenticationError:
    print("Invalid API key. Check your PERPLEXITY_API_KEY.")
    
except RateLimitError:
    print("Rate limit exceeded. Please wait before retrying.")
    
except Timeout:
    print("Request timed out. Try increasing timeout or retry.")
    
except APIConnectionError:
    print("Network error. Check your internet connection.")
    
except APIError as e:
    print(f"API error occurred: {e}")
    
except Exception as e:
    print(f"Unexpected error: {e}")
```

### Retry Logic

```python
import time

def call_with_retry(max_retries=3, delay=1):
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="sonar",
                messages=[{"role": "user", "content": "Hello"}]
            )
            return response
            
        except RateLimitError:
            if attempt < max_retries - 1:
                wait_time = delay * (2 ** attempt)  # Exponential backoff
                print(f"Rate limited. Waiting {wait_time}s...")
                time.sleep(wait_time)
            else:
                raise
                
        except Timeout:
            if attempt < max_retries - 1:
                print(f"Timeout. Retry {attempt + 1}/{max_retries}...")
                time.sleep(delay)
            else:
                raise
```

---

## Rate Limits

### Understanding Rate Limits

Perplexity API has rate limits based on your subscription tier:

- **Requests per minute (RPM)**
- **Tokens per minute (TPM)**
- **Requests per day (RPD)**

Check your current limits at: https://www.perplexity.ai/settings/api

### Handling Rate Limits

```python
import time
from openai import RateLimitError

def rate_limited_request(messages):
    try:
        return client.chat.completions.create(
            model="sonar",
            messages=messages
        )
    except RateLimitError as e:
        # Check if retry-after header is present
        retry_after = getattr(e, 'retry_after', 60)
        print(f"Rate limited. Waiting {retry_after} seconds...")
        time.sleep(retry_after)
        return rate_limited_request(messages)  # Retry
```

### Token Management

```python
# Monitor token usage
response = client.chat.completions.create(
    model="sonar",
    messages=[{"role": "user", "content": "Hello"}]
)

print(f"Prompt tokens: {response.usage.prompt_tokens}")
print(f"Completion tokens: {response.usage.completion_tokens}")
print(f"Total tokens: {response.usage.total_tokens}")

# Estimate costs based on usage
tokens_used = response.usage.total_tokens
```

---

## Examples

### Example 1: Research Assistant with Citations

```python
def research_query(question):
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=[
            {
                "role": "system",
                "content": "You are a research assistant. Provide accurate, "
                           "well-sourced information with citations."
            },
            {"role": "user", "content": question}
        ],
        return_citations=True,
        search_recency_filter="month",
        temperature=0.2
    )
    
    answer = response.choices[0].message.content
    citations = getattr(response.choices[0].message, 'citations', [])
    
    return {
        "answer": answer,
        "sources": citations,
        "tokens_used": response.usage.total_tokens
    }

# Use it
result = research_query("What are the latest advancements in quantum computing?")
print(result["answer"])
print("\nSources:")
for source in result["sources"]:
    print(f"- {source}")
```

### Example 2: Multi-turn Conversation

```python
class PerplexityChat:
    def __init__(self, model="sonar"):
        self.model = model
        self.messages = []
    
    def add_system_message(self, content):
        self.messages.append({"role": "system", "content": content})
    
    def chat(self, user_message):
        self.messages.append({"role": "user", "content": user_message})
        
        response = client.chat.completions.create(
            model=self.model,
            messages=self.messages
        )
        
        assistant_message = response.choices[0].message.content
        self.messages.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def reset(self):
        self.messages = []

# Use it
chat = PerplexityChat(model="sonar")
chat.add_system_message("You are a helpful coding assistant.")

print(chat.chat("What is Python?"))
print(chat.chat("Show me a hello world example"))
print(chat.chat("How do I handle exceptions?"))
```

### Example 3: Streaming with Progress

```python
def stream_response(question):
    response = client.chat.completions.create(
        model="sonar",
        messages=[{"role": "user", "content": question}],
        stream=True
    )
    
    full_response = ""
    print("Response: ", end="", flush=True)
    
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            full_response += content
            print(content, end="", flush=True)
    
    print("\n")
    return full_response

# Use it
answer = stream_response("Explain machine learning in simple terms")
```

### Example 4: Domain-Specific Search

```python
def search_github_issues(query):
    response = client.chat.completions.create(
        model="sonar",
        messages=[
            {"role": "user", "content": f"Find information about: {query}"}
        ],
        search_domain_filter=["github.com", "stackoverflow.com"],
        return_citations=True,
        temperature=0.2
    )
    
    return {
        "answer": response.choices[0].message.content,
        "sources": getattr(response.choices[0].message, 'citations', [])
    }

# Use it
result = search_github_issues("React hooks best practices")
print(result["answer"])
```

### Example 5: Batch Processing with Error Handling

```python
import time

def batch_process_queries(queries, delay=1):
    results = []
    
    for i, query in enumerate(queries):
        try:
            print(f"Processing query {i+1}/{len(queries)}: {query[:50]}...")
            
            response = client.chat.completions.create(
                model="sonar",
                messages=[{"role": "user", "content": query}],
                max_tokens=200
            )
            
            results.append({
                "query": query,
                "answer": response.choices[0].message.content,
                "tokens": response.usage.total_tokens,
                "success": True
            })
            
            # Rate limiting: wait between requests
            if i < len(queries) - 1:
                time.sleep(delay)
                
        except Exception as e:
            results.append({
                "query": query,
                "error": str(e),
                "success": False
            })
    
    return results

# Use it
queries = [
    "What is AI?",
    "Explain quantum computing",
    "Latest news in space exploration"
]

results = batch_process_queries(queries, delay=2)

for result in results:
    if result["success"]:
        print(f"\nQ: {result['query']}")
        print(f"A: {result['answer'][:100]}...")
    else:
        print(f"\nQ: {result['query']}")
        print(f"Error: {result['error']}")
```

---

## Resources

- **Official Website**: https://www.perplexity.ai
- **API Documentation**: https://docs.perplexity.ai
- **API Key Management**: https://www.perplexity.ai/settings/api
- **OpenAI SDK Docs**: https://github.com/openai/openai-python
- **Community Discord**: https://discord.gg/perplexity-ai

---

## FAQ

### Q: What's the difference between Perplexity and OpenAI?
A: Perplexity models have built-in web search, providing up-to-date, grounded responses with sources. OpenAI models rely on training data and don't search the web.

### Q: Can I use Perplexity for free?
A: Perplexity offers a free tier with limited requests. Check pricing at https://www.perplexity.ai/pricing

### Q: How do I get citations for answers?
A: Set `return_citations=True` in your API call to receive source URLs.

### Q: What's the context window size?
A: All current Perplexity models support 127,072 tokens (approximately 95,304 words).

### Q: Can I use Perplexity with LangChain or other frameworks?
A: Yes! Since Perplexity uses the OpenAI-compatible API, it works with most frameworks that support OpenAI.

### Q: How do I limit searches to recent information?
A: Use `search_recency_filter` parameter with values like "day", "week", or "month".

---

## Changelog

**November 2025**
- Updated model list (sonar, sonar-pro, sonar-reasoning)
- Added web search parameter documentation
- Included streaming examples
- Added best practices and error handling

---

*Last updated: November 7, 2025*
