import fitz, os, sys
for path in sys.argv[1:]:
    doc = fitz.open(path)
    base = os.path.splitext(os.path.basename(path))[0]
    print(f"{base}: {len(doc)} pages, metadata={doc.metadata}")
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
        out = f'.agents/outputs/{base}-page-{i+1}.png'
        pix.save(out)
        print(out)
