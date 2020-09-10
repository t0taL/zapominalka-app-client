import { Injectable } from '@angular/core';

import { LearnMode } from '@learn/+state/learn.reducer';

import { SoundFiles } from '@core/enums/sound-files';


@Injectable()
export class SoundsService {
  private readonly simplePendingSound: HTMLAudioElement = this.createSound(SoundFiles.SIMPLE_PENDING, true);
  private readonly timingPendingSound: HTMLAudioElement = this.createSound(SoundFiles.TIMING_PENDING, true);
  private readonly successSound: HTMLAudioElement = this.createSound(SoundFiles.SUCCESS);
  private readonly failSound: HTMLAudioElement = this.createSound(SoundFiles.FAIL);
  private readonly skipSound: HTMLAudioElement = this.createSound(SoundFiles.SKIP);
  private readonly endLearnSound: HTMLAudioElement = this.createSound(SoundFiles.END_LEARN);

  private learnMode: LearnMode = null;
  soundsMuted: boolean = false;

  constructor() {
  }

  private createSound(src: string, loop: boolean = false): HTMLAudioElement {
    const audio = new Audio();

    audio.src = src;
    audio.load();
    audio.loop = loop;

    return audio;
  }

  muteSounds(state: boolean): void {
    this[`${this.learnMode}PendingSound`].muted =
    this.successSound.muted =
    this.failSound.muted =
    this.skipSound.muted =
    this.endLearnSound.muted =
    this.soundsMuted = state;
  }

  stopPendingSound(): void {
    this[`${this.learnMode}PendingSound`].pause();
    this[`${this.learnMode}PendingSound`].currentTime = 0;
  }

  setLearnMode(mode: LearnMode): void {
    this.learnMode = mode;
  }

  playPendingSound(): void {
    this[`${this.learnMode}PendingSound`].play();
  }

  playSuccessSound(): void {
    this.stopPendingSound();
    this.successSound.play();
  }

  playFailSound(): void {
    this.stopPendingSound();
    this.failSound.play();
  }

  playSkipSound(): void {
    this.stopPendingSound();
    this.skipSound.play();
  }

  playEndLearnSound(): void {
    this.stopPendingSound();
    this.endLearnSound.play();
    this.learnMode = null;
  }
}
