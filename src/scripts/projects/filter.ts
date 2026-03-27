export function initProjectFilter() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-categories]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter ?? 'all';

      buttons.forEach((b) => b.classList.remove('filter-active'));
      btn.classList.add('filter-active');

      cards.forEach((card) => {
        const cats = card.dataset.categories?.split(',') ?? [];
        const visible = filter === 'all' || cats.includes(filter);
        card.style.display = visible ? '' : 'none';
      });
    });
  });
}
