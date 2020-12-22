import { computed, Ref, ref } from "vue";

export function useSearch(items: Ref<string[]>, isCaseSensitive?: boolean) {
  const searchTerm = ref<string>('');

  const availableItems = computed<string[]>(() => {
    if (searchTerm.value === '') {
      return items.value;
    }
    return items.value.filter(
      (item) => isCaseSensitive
        ? item.includes(searchTerm.value)
        : item.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });

  return {
    searchTerm,
    availableItems
  };
}