#!/usr/bin/env python
# coding: utf-8

# In[1]:

import pandas as pd

# In[2]:


# Reading Excel spreadsheet
df = pd.read_excel(r'..\data\Case-Ownership-by-Products.xlsx',
                   sheet_name='Product by PQ and Tech',
                   na_filter=False)
print(df.head())

# In[3]:


# Creating new columns for technology and queue

# df_subset = df[["Online", "Desktop", "Enterprise", "SDK", "Data Management", "Implementation", "Professional Services"]]
df_subset = df[df.columns[1:8]]
print(df_subset.head())

# In[4]:


Technology = [""] * df_subset.shape[0]
Queue = [""] * df_subset.shape[0]

for i in range(0, df_subset.shape[0]):
    for j in range(0, df_subset.shape[1]):
        if df_subset.iloc[i, j] != "":
            Technology[i] += df_subset.columns[j] + ", "
            Queue[i] += df_subset.iloc[i, j] + ", "

# print(Technology)
# print(Queue)

# In[5]:


# Removing extra commas

for i in range(0, df_subset.shape[0]):
    if Technology[i].endswith(', '):
        Technology[i] = Technology[i].rstrip(', ')
    if Queue[i].endswith(', '):
        Queue[i] = Queue[i].rstrip(', ')

print(Technology)
print(Queue)

# In[6]:


# Combining columns

final = {'product': df["Product"],
         'technology': Technology,
         'queue': Queue,
         'supportMethod': df["Support Method"],
         'reference': df["Reference"]}

df_final = pd.DataFrame(final)
print(df_final.head())

# In[7]:


# Exporting JSON

df_json = df_final.to_json(r'..\data\product_tech_queue.json', orient="records")
