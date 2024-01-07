CREATE OR REPLACE FUNCTION updateProduct()
RETURNS TRIGGER AS $$
BEGIN

    DECLARE qt INTEGER;
    SELECT quantity INTO qt FROM product WHERE code = NEW.code_product;
    UPDATE product
    SET quantity = qt - NEW.quantity
    WHERE code = NEW.code_product;
    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER updateProductTrigger
AFTER INSERT ON sale
FOR EACH ROW
EXECUTE FUNCTION updateProduct();
