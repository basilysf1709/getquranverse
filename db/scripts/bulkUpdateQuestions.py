import requests

def get_quran_audio_links():
    response = requests.get('http://api.alquran.cloud/v1/edition?format=audio')
    editions = response.json()['data']

    arabic_audio_links = {}
    
    for edition in editions:
        # Filter out non-Arabic editions
        if edition['identifier'].startswith('ar.') or 'arabic' in edition['identifier']:
            surah_number = 2  # Surah Al-Baqara
            ayah_number = 255  # Ayah number
            audio_url = f"https://cdn.islamic.network/quran/audio/64/{edition['identifier']}/{surah_number * 1000 + ayah_number}.mp3"
            arabic_audio_links[edition['identifier']] = {
                'Audio URL': audio_url,
                'Surah': 'Al-Baqara',
                'Ayah': f'{surah_number}:{ayah_number}'
            }

    return arabic_audio_links

arabic_audios = get_quran_audio_links()
for edition, details in arabic_audios.items():
    print(f"Edition: {edition}, Audio URL: {details['Audio URL']}, Surah: {details['Surah']}, Ayah: {details['Ayah']}")
