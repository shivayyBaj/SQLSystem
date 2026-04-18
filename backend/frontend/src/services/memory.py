chat_memory = []

def add_to_memory(q, sql):
    chat_memory.append({"question": q, "sql": sql})

def get_memory():
    return str(chat_memory[-5:])