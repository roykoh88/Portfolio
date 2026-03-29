/** 날짜 / 명칭 / 발급처 — 같은 발급처는 rowspan */
export function GroupedIssueTable({ groups, nameColumnLabel }) {
  if (!groups.length) return null
  return (
    <div className="award-table-card">
      <table className="award-table">
        <thead>
          <tr>
            <th scope="col">날짜</th>
            <th scope="col">{nameColumnLabel}</th>
            <th scope="col">발급처</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) =>
            g.items.map((row, i) => (
              <tr key={`${g.issuer}-${row.date}-${row.title}-${i}`}>
                <td>{row.date}</td>
                <td>{row.title}</td>
                {i === 0 ? (
                  <td rowSpan={g.items.length}>{g.issuer}</td>
                ) : null}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
}
