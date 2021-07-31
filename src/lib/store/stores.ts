import { writable } from 'svelte/store';
import * as fromLocalStorage from '$lib/services/local-storage';

export const theme = writable(fromLocalStorage.loadEntry('theme') || 'dark-theme');
