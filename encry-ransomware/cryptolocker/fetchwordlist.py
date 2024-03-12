import requests
import json

def fetch_and_clean_wordlist(url):
    response = requests.get(url)
    if response.status_code == 200:
        # Assuming the fetched content is a JSON array formatted as a string
        wordlist_raw = json.loads(response.text)
        # Clean each word: remove newline characters and any other unwanted characters
        cleaned_wordlist = [word.strip().replace('\\n', '') for word in wordlist_raw]
        return cleaned_wordlist
    else:
        print(f"Failed to fetch wordlist: HTTP {response.status_code}")
        return []

def main():
    url = "http://10.0.0.1:5050/wordlist/default_passwords_for_services/"
    cleaned_wordlist = fetch_and_clean_wordlist(url)
    print(cleaned_wordlist)
    # for word in cleaned_wordlist:
    #     print(word)

if __name__ == "__main__":
    main()
