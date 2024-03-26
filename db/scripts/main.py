import requests
import random
import json
import csv
import uuid

surah_names = {
    1: "Al-Fatiha",
    2: "Al-Baqarah",
    3: "Aal-E-Imran",
    4: "An-Nisa'",
    5: "Al-Ma'idah",
    6: "Al-An'am",
    7: "Al-A'raf",
    8: "Al-Anfal",
    9: "At-Tawbah",
    10: "Yunus",
    11: "Hud",
    12: "Yusuf",
    13: "Ar-Ra'd",
    14: "Ibrahim",
    15: "Al-Hijr",
    16: "An-Nahl",
    17: "Al-Isra",
    18: "Al-Kahf",
    19: "Maryam",
    20: "Ta-Ha",
    21: "Al-Anbiya",
    22: "Al-Hajj",
    23: "Al-Mu'minun",
    24: "An-Nur",
    25: "Al-Furqan",
    26: "Ash-Shu'ara",
    27: "An-Naml",
    28: "Al-Qasas",
    29: "Al-Ankabut",
    30: "Ar-Rum",
    31: "Luqman",
    32: "As-Sajda",
    33: "Al-Ahzab",
    34: "Saba'",
    35: "Fatir",
    36: "Ya-Sin",
    37: "As-Saffat",
    38: "Sad",
    39: "Az-Zumar",
    40: "Ghafir",
    41: "Fussilat",
    42: "Ash-Shura",
    43: "Az-Zukhruf",
    44: "Ad-Dukhan",
    45: "Al-Jathiya",
    46: "Al-Ahqaf",
    47: "Muhammad",
    48: "Al-Fath",
    49: "Al-Hujurat",
    50: "Qaf",
    51: "Adh-Dhariyat",
    52: "At-Tur",
    53: "An-Najm",
    54: "Al-Qamar",
    55: "Ar-Rahman",
    56: "Al-Waqi'a",
    57: "Al-Hadid",
    58: "Al-Mujadila",
    59: "Al-Hashr",
    60: "Al-Mumtahina",
    61: "As-Saff",
    62: "Al-Jumu'a",
    63: "Al-Munafiqoon",
    64: "At-Taghabun",
    65: "At-Talaq",
    66: "At-Tahrim",
    67: "Al-Mulk",
    68: "Al-Qalam",
    69: "Al-Haqqah",
    70: "Al-Ma'arij",
    71: "Nuh",
    72: "Al-Jinn",
    73: "Al-Muzzammil",
    74: "Al-Muddathir",
    75: "Al-Qiyama",
    76: "Al-Insan",
    77: "Al-Mursalat",
    78: "An-Naba",
    79: "An-Nazi'at",
    80: "Abasa",
    81: "At-Takwir",
    82: "Al-Infitar",
    83: "Al-Mutaffifin",
    84: "Al-Inshiqaq",
    85: "Al-Burooj",
    86: "At-Tariq",
    87: "Al-A'la",
    88: "Al-Ghashiya",
    89: "Al-Fajr",
    90: "Al-Balad",
    91: "Ash-Shams",
    92: "Al-Lail",
    93: "Ad-Duhaa",
    94: "Ash-Sharh",
    95: "At-Tin",
    96: "Al-'Alaq",
    97: "Al-Qadr",
    98: "Al-Bayyina",
    99: "Az-Zalzala",
   100: "Al-'Adiyat",
   101: "Al-Qari'a",
   102: "At-Takathur",
   103: "Al-Asr",
   104: "Al-Humaza",
   105: "Al-Fil",
   106: "Quraish",
   107: "Al-Ma'un",
   108: "Al-Kawthar",
   109: "Al-Kafirun",
   110: "An-Nasr",
   111: "Al-Masad",
   112: "Al-Ikhlas",
   113: "Al-Falaq",
   114: "An-Nas"
}

qari_names = [
  "Sudais",
  "Rifai",
  "Shuraym",
  "Alafasy",
  "Minshawi/Murattal"
]

# Defining the range of Surahs for the questions
surah_ranges = {
    78: (1, 40), 79: (1, 46), 80: (1, 42), 81: (1, 29), 82: (1, 19),
    83: (1, 36), 84: (1, 25), 85: (1, 22), 86: (1, 17), 87: (1, 19),
    88: (1, 26), 89: (1, 30), 90: (1, 20), 91: (1, 15), 92: (1, 21),
    93: (1, 11), 94: (1, 8), 95: (1, 8), 96: (1, 19), 97: (1, 5),
    98: (1, 8), 99: (1, 8), 100: (1, 11), 101: (1, 11), 102: (1, 8),
    103: (1, 3), 104: (1, 9), 105: (1, 5), 106: (1, 4), 107: (1, 7),
    108: (1, 3), 109: (1, 6), 110: (1, 3), 111: (1, 5), 112: (1, 4),
    113: (1, 5), 114: (1, 6)
}

def create_question():
    # Selecting a random Surah and Ayah from the updated ranges
    surah_number = random.choice(list(surah_ranges.keys()))
    ayah_number = random.randint(*surah_ranges[surah_number])

    # Selecting a random Qari
    qari_name = random.choice(qari_names)

    # Constructing the audio URL
    audio_url = f"https://verses.quran.com/{qari_name}/mp3/{str(surah_number).zfill(3)}{str(ayah_number).zfill(3)}.mp3"
    
    # Preparing four options, ensuring the correct answer is one of them
    options = random.sample(list(surah_names.values()), 4)
    correct_answer = surah_names.get(surah_number, "Unknown Surah")

    if correct_answer not in options:
        # Replace a random option with the correct answer if it's not in the initial list
        options[random.randint(0, 3)] = correct_answer

    random.shuffle(options)
    
    # Getting the index of the correct answer
    answer_index = options.index(correct_answer) + 1  # Adjusting index to be 1-based

    return {
        "question": "What is the name of this Surah?",
        "audio_clip": audio_url,
        "option_1": options[0],
        "option_2": options[1],
        "option_3": options[2],
        "option_4": options[3],
        "answer_index": answer_index
    }

# Creating a list of questions
questions = [create_question() for _ in range(1000)]  # Adjust the range as needed

# Creating the JSON structure
json_data = {"questions": questions}

# Writing to a JSON file
json_file_path = 'surah_quiz.json'
with open(json_file_path, 'w') as file:
    json.dump(json_data, file, indent=4)
    

# Converting JSON data to CSV format
csv_file_path = 'surah_quiz.csv'
with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=["id", "question", "audio_clip", "option_1", "option_2", "option_3", "option_4", "answer_index", "audio_length"])
    writer.writeheader()

    for question in questions:
        question_data = {
            "id": str(uuid.uuid4()),
            "question": question["question"],
            "audio_clip": question["audio_clip"],
            "option_1": question["option_1"],
            "option_2": question["option_2"],
            "option_3": question["option_3"],
            "option_4": question["option_4"],
            "answer_index": question["answer_index"],
            "audio_length": ""  # Leave empty as requested
        }
        writer.writerow(question_data)