#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import json


# In[2]:


# 0 - Read xlsx spreadsheet

df = pd.read_excel(r'..\data\Case-Ownership-by-Products.xlsx',
                   sheet_name='Product by PQ and Tech',
                   na_filter=False)
df.head()


# In[3]:


# 1 - Create subset of df with all columns for queues

# df_subset = df[["Online", "Desktop", "Enterprise", "SDK", "Data Management", "Implementation", "Professional Services"]]
df_subset = df[df.columns[1:8]]
df_subset.head()


# In[4]:


# 2 - List possible values for Technology and Queue  

Technologies = [""] * df_subset.shape[1]
Queues = [""] * df_subset.shape[1]

for i in range(0, df_subset.shape[1]):
    Technologies[i] = df_subset.columns[i].replace(" ", "")
    column = set(df_subset[df_subset.columns[i]])
    Queues[i] = list(filter(None, column))

print(Technologies)    
print(Queues)


# In[5]:


# 3 - Join queues to corresponding technology

tech_queue = {}

for index in range(0, len(Technologies)):
    tech_queue[Technologies[index]] = [Queues[index]]

df_tech_queue = pd.DataFrame(tech_queue)
df_tech_queue


# In[6]:


# 4 - Export df_tech_queue to JSON

json_tech_queue = df_tech_queue.to_json(r'..\data\tech_queues.json', orient="records")


# In[7]:


# 5 - Create new column for technology and combine queues to one column

Technology = [""] * df_subset.shape[0]
Queue = [""] * df_subset.shape[0]

for i in range(0, df_subset.shape[0]):
    for j in range(0, df_subset.shape[1]):
        if df_subset.iloc[i, j] != "":
            Technology[i] += df_subset.columns[j] + ", "
            Queue[i] += df_subset.iloc[i, j] + ", "
            
print(Technology)
print(Queue)


# In[8]:


# 5 - Remove extra commas from technology and queue columns

for i in range(0, df_subset.shape[0]):
    if (Technology[i].endswith(', ')):
        Technology[i] = Technology[i].rstrip(', ')
    if (Queue[i].endswith(', ')):
        Queue[i] = Queue[i].rstrip(', ')

print(Technology)
print(Queue)     


# In[9]:


# 5 - Split Reference into Email and URL

df_reference = df[["Reference"]]

Email = [""] * df_reference.shape[0]
URL = [""] * df_reference.shape[0]

for i in range(0, df_reference.shape[0]):
    if ("@" in df_reference.iloc[i, 0]): 
        Email[i] += df_reference.iloc[i, 0]
    else:
        URL[i] += df_reference.iloc[i, 0]

print(Email) 
print(URL)    


# In[10]:


# 6 - Combine Technology, Queue, Email, URL back to corresponding product
final = {'product':df["Product"], 
        'technology':Technology, 
        'queue':Queue,
        'supportMethod':df["Support Method"],
        'email':Email,
        'url': URL} 

df_final = pd.DataFrame(final)
df_final.head()


# In[11]:


# 7 - Export df_final to JSON

json_final = df_final.to_json(r'..\data\product_tech_queues.json', orient="records")

