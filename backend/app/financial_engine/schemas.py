from typing import Literal, Union

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

NumberText = Union[float, str]


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class PropertyDetails(CamelModel):
    purpose: Literal["rent", "live"] = "rent"
    street: str = ""
    city: str = ""
    state_code: str = "TX"
    type: Literal["sfr", "duplex", "condo"] = "sfr"
    beds: float = Field(3, ge=0, le=20)
    baths: float = Field(2, ge=0, le=20)
    sqft: NumberText = "1480"
    lot: NumberText = "0.18"
    year: NumberText = "1998"
    condition: Literal["ready", "light", "heavy"] = "ready"


class Deal(CamelModel):
    asking: NumberText = ""
    offer: NumberText = ""
    price_touched: bool = False
    loan: Literal["f30", "f15", "dscr"] = "f30"
    down_payment: float = Field(0.2, ge=0, lt=1)
    rent_mode: Literal["estimate", "manual"] = "estimate"
    manual_rent: NumberText = ""
    hoa: NumberText = ""


class Insurance(CamelModel):
    coverage: Literal["basic", "standard", "full"] = "standard"
    deductible: Literal[1000, 2500, 5000] = 2500
    extras: dict[str, bool] = {}


class AnalysisRequest(CamelModel):
    details: PropertyDetails
    deal: Deal
    insurance: Insurance = Insurance()
    horizon: Literal[1, 5, 10] = 5
