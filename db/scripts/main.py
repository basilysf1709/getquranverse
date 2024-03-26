import requests

recitation_id = 1  # Example recitation ID
ayah_key = "1:2"  # Surah 1, Ayah 2

url = f"https://api.quran.com/api/v4/recitations/{recitation_id}/by_ayah/{ayah_key}"

headers = {
    'Accept': 'application/json'
}

response = requests.get(url, headers=headers)
data = response.json()

# Extracting the audio file URL
audio_url = data['audio_files'][0]['url']
print(audio_url)
