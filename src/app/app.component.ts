import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectService } from './services/project.service';
import { ProjectContent, UnitLayout } from './models/project.model';

export interface ColorTheme {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  bgClass: string;
  cardBgClass: string;
  inputBgClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  borderClass: string;
  accentHex: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private projectService = inject(ProjectService);
  private sanitizer = inject(DomSanitizer);

  project = signal<ProjectContent | null>(null);
  selectedLayout = signal<UnitLayout | null>(null);
  activeTab: 'overview' | 'layouts' | 'facilities' | 'fees' | 'documents' | 'developer' = 'overview';
  loading = signal<boolean>(true);

  // Gallery Active Hero State
  activeHeroImage = signal<string>('');

  // YouTube Safe URL
  safeVideoUrl = signal<SafeResourceUrl | null>(null);

  // Theme Palette (Dark + Bright Light Series)
  themes: ColorTheme[] = [
    // Bright Light Series
    {
      id: 'pearl-marble',
      name: 'Pearl Marble (Light)',
      mode: 'light',
      bgClass: 'bg-slate-100',
      cardBgClass: 'bg-white',
      inputBgClass: 'bg-slate-50',
      textPrimaryClass: 'text-slate-900',
      textSecondaryClass: 'text-slate-500',
      borderClass: 'border-slate-200',
      accentHex: '#059669' // Emerald
    },
    {
      id: 'pure-ivory',
      name: 'Pure Ivory (Light)',
      mode: 'light',
      bgClass: 'bg-stone-100',
      cardBgClass: 'bg-stone-50',
      inputBgClass: 'bg-white',
      textPrimaryClass: 'text-stone-900',
      textSecondaryClass: 'text-stone-500',
      borderClass: 'border-stone-200',
      accentHex: '#d97706' // Warm Gold
    },
    {
      id: 'soft-sky',
      name: 'Soft Sky (Light)',
      mode: 'light',
      bgClass: 'bg-sky-50',
      cardBgClass: 'bg-white',
      inputBgClass: 'bg-sky-50/50',
      textPrimaryClass: 'text-slate-900',
      textSecondaryClass: 'text-slate-500',
      borderClass: 'border-sky-200',
      accentHex: '#2563eb' // Sapphire Blue
    },
    // Dark Series
    {
      id: 'obsidian',
      name: 'Midnight Obsidian (Dark)',
      mode: 'dark',
      bgClass: 'bg-slate-950',
      cardBgClass: 'bg-slate-900/90',
      inputBgClass: 'bg-slate-950',
      textPrimaryClass: 'text-white',
      textSecondaryClass: 'text-slate-400',
      borderClass: 'border-white/10',
      accentHex: '#10b981'
    },
    {
      id: 'sapphire-dark',
      name: 'Royal Sapphire (Dark)',
      mode: 'dark',
      bgClass: 'bg-slate-900',
      cardBgClass: 'bg-slate-950/80',
      inputBgClass: 'bg-slate-900',
      textPrimaryClass: 'text-white',
      textSecondaryClass: 'text-slate-400',
      borderClass: 'border-white/10',
      accentHex: '#3b82f6'
    }
  ];

  activeTheme = signal<ColorTheme>(this.themes[0]);
  customAccentColor = signal<string>('#059669');
  showThemePicker = signal<boolean>(false);

  // Modal Control & Form State
  showBookingModal = signal<boolean>(false);
  bookingSuccess = signal<boolean>(false);
  bookingName = signal<string>('');
  bookingPhone = signal<string>('');
  bookingDate = signal<string>('');

  // Sidebar Inquiry Form Signals
  inquiryName = signal<string>('');
  inquiryEmail = signal<string>('');
  inquiryPhone = signal<string>('');
  inquirySubmitted = signal<boolean>(false);

  ngOnInit(): void {
    this.projectService.getProjectData().subscribe({
      next: (res) => {
        if (res && res.content) {
          const content = res.content;
          this.project.set(content);

          if (content.imageList && content.imageList.length > 0) {
            this.activeHeroImage.set(content.imageList[0]);
          } else {
            this.activeHeroImage.set(content.logo);
          }

          if (content.layouts && content.layouts.length > 0) {
            this.selectedLayout.set(content.layouts[0]);
          }

          if (content.video) {
            const videoId = this.extractYoutubeId(content.video);
            if (videoId) {
              const embedUrl = `https://www.youtube.com/embed/${videoId}`;
              this.safeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl));
            }
          }
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  setTab(tab: 'overview' | 'layouts' | 'facilities' | 'fees' | 'documents' | 'developer'): void {
    this.activeTab = tab;
  }

  selectLayout(layout: UnitLayout): void {
    this.selectedLayout.set(layout);
  }

  setHeroImage(imgUrl: string): void {
    this.activeHeroImage.set(imgUrl);
  }

  toggleThemePicker(): void {
    this.showThemePicker.set(!this.showThemePicker());
  }

  selectPresetTheme(theme: ColorTheme): void {
    this.activeTheme.set(theme);
    this.customAccentColor.set(theme.accentHex);
  }

  onCustomColorChange(color: string): void {
    this.customAccentColor.set(color);
  }

  decodeUrl(urlStr: string): string {
    if (!urlStr) return '#';
    try {
      return decodeURIComponent(urlStr);
    } catch {
      return urlStr;
    }
  }

  /**
   * Safe Tour URL Extractor
   */
  getTourUrl(tourData: any): string | null {
    if (!tourData || !tourData.value) return null;

    if (Array.isArray(tourData.value) && tourData.value.length > 0 && tourData.value[0]) {
      return this.decodeUrl(tourData.value[0]);
    }

    if (typeof tourData.value === 'string' && tourData.value.trim().length > 0) {
      return this.decodeUrl(tourData.value);
    }

    return null;
  }

  private extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Modal Handlers
  openBookingModal(): void {
    this.bookingSuccess.set(false);
    this.bookingName.set('');
    this.bookingPhone.set('');
    this.bookingDate.set('');
    this.showBookingModal.set(true);
  }

  closeBookingModal(): void {
    this.bookingName.set('');
    this.bookingPhone.set('');
    this.bookingDate.set('');
    this.showBookingModal.set(false);
  }

  submitBooking(event: Event): void {
    event.preventDefault();
    if (this.bookingName().trim() && this.bookingPhone().trim() && this.bookingDate().trim()) {
      this.bookingSuccess.set(true);
      setTimeout(() => this.closeBookingModal(), 2200);
    }
  }

  // Sidebar Inquiry Handlers
  submitInquiry(event: Event): void {
    event.preventDefault();
    if (this.inquiryName().trim() && this.inquiryEmail().trim() && this.inquiryPhone().trim()) {
      this.inquirySubmitted.set(true);
    }
  }

  resetInquiry(): void {
    this.inquiryName.set('');
    this.inquiryEmail.set('');
    this.inquiryPhone.set('');
    this.inquirySubmitted.set(false);
  }
}
