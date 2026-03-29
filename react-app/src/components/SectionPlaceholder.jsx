export function SectionPlaceholder({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {children ?? (
          <p className="section-desc">
            레거시 <code>index.html</code> 내용을 단계적으로 옮길 예정입니다.
          </p>
        )}
      </div>
    </section>
  )
}
