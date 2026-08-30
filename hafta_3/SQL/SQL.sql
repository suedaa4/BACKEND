-- 1. Tüm yazarları listele
SELECT * FROM authors;

-- 2. Tüm kitapları isimleriyle birlikte getir
SELECT title, publication_year FROM books;

-- 3. Belirli bir yıldan sonra basılan kitaplar
SELECT * FROM books WHERE publication_year > 2015;

-- 4. İsmi 'A' harfi ile başlayan yazarlar
SELECT * FROM authors WHERE first_name LIKE 'A%';

-- 5. Kitapları yazarlarıyla birlikte getir (INNER JOIN)
SELECT books.title, authors.first_name, authors.last_name 
FROM books 
JOIN authors ON books.author_id = authors.id;

-- 6. Kitapları kategorileriyle birlikte getir
SELECT books.title, categories.name AS category_name 
FROM books 
JOIN categories ON books.category_id = categories.id;

-- 7. Toplam kitap sayısı nedir? (COUNT)
SELECT COUNT(*) AS total_books FROM books;

-- 8. Kütüphaneye kayıtlı toplam üye sayısı
SELECT COUNT(*) AS total_members FROM members;

-- 9. Hangi kategoride kaç kitap var? (GROUP BY)
SELECT categories.name, COUNT(books.id) AS book_count 
FROM categories 
LEFT JOIN books ON categories.id = books.category_id 
GROUP BY categories.name;

-- 10. Yazarlara göre kitap sayıları
SELECT authors.first_name, authors.last_name, COUNT(books.id) AS book_count 
FROM authors 
LEFT JOIN books ON authors.id = books.author_id 
GROUP BY authors.first_name, authors.last_name;

-- 11. Ortalama kitap basım yılı nedir? (AVG)
SELECT AVG(publication_year) AS avg_year FROM books;

-- 12. En yeni basılan kitabın yılı (MAX)
SELECT MAX(publication_year) AS newest_book FROM books;

-- 13. Aktif olarak ödünç alınmış (henüz iade edilmemiş) kitaplar
SELECT * FROM borrowings WHERE return_date IS NULL;

-- 14. Üyelerin yaptığı toplam ödünç alma işlemleri
SELECT members.first_name, members.last_name, COUNT(borrowings.id) AS borrow_count 
FROM members 
JOIN borrowings ON members.id = borrowings.member_id 
GROUP BY members.first_name, members.last_name;

-- 15. Hangi kitap kaç kez ödünç alındı?
SELECT books.title, COUNT(borrowings.id) AS times_borrowed 
FROM books 
JOIN borrowings ON books.id = borrowings.book_id 
GROUP BY books.title;

-- 16. Alt sorgu (Subquery): 2015 yılından sonra basılan kitapların ödünç alınma kayıtları
SELECT * FROM borrowings 
WHERE book_id IN (SELECT id FROM books WHERE publication_year > 2015);

-- 17. Hiç kitap ödünç almamış üyeler (LEFT JOIN / NULL kontrolü)
SELECT members.first_name, members.last_name 
FROM members 
LEFT JOIN borrowings ON members.id = borrowings.member_id 
WHERE borrowings.id IS NULL;

-- 18. Performans analizi için örnek sorgu (EXPLAIN ANALYZE)
EXPLAIN ANALYZE SELECT * FROM books WHERE title = 'Veritabanı Sistemleri';

-- 19. Arama performansını artırmak için indeks oluşturma (INDEX)
CREATE INDEX idx_book_title ON books(title);

-- 20. Birden fazla tablodan detaylı birleştirme (Multi-Join)
SELECT b.title AS kitap, a.first_name AS yazar, c.name AS kategori, m.first_name AS alan_uye, br.borrow_date 
FROM borrowings br
JOIN books b ON br.book_id = b.id
JOIN authors a ON b.author_id = a.id
JOIN categories c ON b.category_id = c.id
JOIN members m ON br.member_id = m.id;