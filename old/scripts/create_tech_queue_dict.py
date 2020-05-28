#!/usr/bin/env python
# coding: utf-8

# In[ ]:

import pandas as pd

# In[ ]:


# Reading Excel spreadsheet
df = pd.read_excel(r'..\data\Case-Ownership-by-Products.xlsx',
                   sheet_name='Product by PQ and Tech',
                   na_filter=False)
print(df.head())


# In[ ]:


# Extracting columns of queues

# df_subset = df[["Online", "Desktop", "Enterprise", "SDK", "Data Management", "Implementation", "Professional Services"]]
df_subset = df[df.columns[1:8]]
print(df_subset.head())


# In[ ]:


# Preparing keys (technologies) and values (unique queue names)

Keys = [""] * df_subset.shape[1]
Values = [""] * df_subset.shape[1]

for i in range(0, df_subset.shape[1]):
    Keys[i] = df_subset.columns[i].replace(" ", "")
#     Values[i] = df_subset[df_subset.columns[i]].unique()
    column = set(df_subset[df_subset.columns[i]])
    Values[i] = list(filter(None, column))


print(Keys)    
print(Values)


# In[ ]:


# Combining keys and values

final_dict = {}

for index in range(0, len(Keys)):
    final_dict[Keys[index]] = [Values[index]]

df_final = pd.DataFrame(final_dict)
print(df_final)


# In[ ]:


# Exporting JSON

df_json = df_final.to_json(r'..\data\tech_queue.json', orient="records")




