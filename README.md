# Sound Picture Quiz

[![React Native](https://img.shields.io/badge/React_Native-0.70.5-blue)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-47.0.12-blue)](https://expo.dev/)

A college project designed to help disabled children learn the sounds of different animals. The app is built using React Native 0.70.5 and Expo 47.0.12, featuring two game modes: Training and "1 sound 4 pictures". The application is foolproof to ensure an enjoyable and smooth user experience for the children.

## APK

You can install the app by downloading and installing [this APK](https://github.com/WoXuS/sound-picture-quiz/blob/main/SoundPictureQuiz.apk) onto your device.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Adding More Animals and Sounds](#adding-more-animals-and-sounds)
- [Building a New APK](#building-a-new-apk)
- [Device Requirements](#device-requirements)

## Features

- Two game modes: Training and "1 sound 4 pictures".
- Ability to set the designated amount of points to "win".
- No punishment for incorrect answers to keep children encouraged.
- Disabled buttons when a sound is played to prevent spam clicking.
- Training mode: Displays all animal pictures and plays the corresponding sound upon clicking.
- 1 sound 4 pictures mode: Plays a sound once after clicking a button, and the correct animal must be clicked for a success sound to play and the screen to turn green.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/WoXuS/sound-picture-quiz.git
cd sound-picture-quiz
npm install
```

## Usage

To start the development server, run:

```bash
npm start
```

Open the Expo app on your Android device and scan the QR code to view the Sound Picture Quiz application.

## Adding More Animals and Sounds

1. Download new images and sounds for animals. Recommended free sources: [Unsplash](https://unsplash.com/) and [Pixabay](https://pixabay.com/).
2. Resize images to a recommended resolution of 1920x1280 at 60% of the original JPG quality.
3. Rename each image and sound file to the animal's name.
4. Add the image files to the `images` folder and sound files to the `sounds` folder in the project directory.
5. Open the `soundPictureArray.js` file located in the `assets` folder.
6. Duplicate an existing element wrapped in curly braces and update the file names with the newly added resources.
7. Repeat this process for each new animal image and sound pair.

## Building a New APK

1. Open a new terminal in your IDE (e.g., Visual Studio Code) and run `npm install` to install all required libraries.
2. Run `npm run build` in the terminal and wait for the application to build.
3. If prompted for login credentials, login to your [expo.dev](https://expo.dev/) account.
4. Once the build is complete, a download link for the new APK will be displayed.

## Device Requirements

- Android 8 or higher (The app was tested on an Android 8 emulator and an actual device running Android 13).
