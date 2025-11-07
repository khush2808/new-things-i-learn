from dotenv import load_dotenv
import os

load_dotenv()

from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("PERPLEXITY_API_KEY"),
    base_url="https://api.perplexity.ai" # Perplexity's API endpoint
)

chat_completion = client.chat.completions.create(
    model="sonar", # Example model, choose based on your needs
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"},
    ],
)
print(chat_completion);
for i in range(len(chat_completion.choices)):
    print(f"Response {i+1}:")
    print(chat_completion.choices[i].message.content)
