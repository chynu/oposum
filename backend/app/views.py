from app import app
import xml.etree.ElementTree as ET
import urllib.request
import Algorithmia
import re
import requests
import json
import html
import pprint
import pymongo
import os
from pymongo import MongoClient
from flask import send_from_directory, render_template

client = MongoClient('localhost', 27017)

@app.route('/')
def index():
    return os.getcwd()

@app.route('/<videoId>/page')
def summaryPage(videoId):
    root_dir = os.path.dirname(os.getcwd())
    print(root_dir)
    # return send_from_directory(os.path.join(root_dir, 'public', 'web'), 'summary.html')
    return render_template('summary.html', title=videoTitle(videoId), summary=summary(videoId))

@app.route('/<videoId>', methods=["POST"])
def summary(videoId):
    tree = ET.ElementTree(ET.fromstring(downloadXml(videoId)))
    fulltext = ''
    for text in tree.iter('text'):
        try:
            fulltext = fulltext + text.text + " "
        except:
            print('error')

    summary = summarizer(fulltext.replace("\n", " ").strip())
    return summary

@app.route('/<videoId>/<wordLength>', methods=["POST"])
def summary2(videoId, wordLength):
    tree = ET.ElementTree(ET.fromstring(downloadXml(videoId)))
    fulltext = ''
    for text in tree.iter('text'):
        try:
            fulltext = fulltext + text.text + " "
        except:
            print('error')

    summary = summarizer2(fulltext.replace("\n", " ").strip(), wordLength)
    return summary

def downloadXml(videoId):
    url = 'http://video.google.com/timedtext?lang=en&v=' + videoId
    response = urllib.request.urlopen(url)
    xml = response.read().decode('utf-8')
    return xml

# def summarizer(fulltext):
#     return fulltext

def videoTitle(videoId):
    jsonData = requests.get('https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=AIzaSyB2Ma4BNgsk8nQYKZap9q77VbNl75l9mF8&fields=items(snippet(title))&part=snippet').text
    jsonString = json.loads(jsonData)
    return jsonString['items'][0]['snippet']['title']

def summarizer(fullText):
    input = fullText.replace(".", ". ").replace("!", "! ") #parsed input from xml file
    summaryLength = round(fullText.count('.') * .15)
    summaryJson = requests.post('http://api.smmry.com/&SM_API_KEY=14CF8F8489&SM_LENGTH=' + str(summaryLength), data = {'sm_api_input': html.unescape(input)}).text
    summary = json.loads(summaryJson)
    print("API Calls Remaining: " + summary['sm_api_limitation'])
    return summary['sm_api_content']

def summarizer2(fullText, summaryLength):
    input = fullText.replace(".", ". ").replace("!", "! ") #parsed input from xml file
    summaryJson = requests.post('http://api.smmry.com/&SM_API_KEY=14CF8F8489&SM_LENGTH=' + summaryLength, data = {'sm_api_input': html.unescape(input)}).text
    summary = json.loads(summaryJson)
    print("API Calls Remaining: " + summary['sm_api_limitation'])
    return summary['sm_api_content']

def dbTest():
    db = client.edusearch
    summaries = db.summaries
    return str(summaries.find_one())